import { useState, useEffect } from 'react';
import { createHunt, getTypes } from '../data/huntFetches.jsx';
import { useNavigate } from 'react-router-dom';

const CreateMission = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [wanted, setWanted] = useState('');
    const [type, setType] = useState('');
    const [types, setTypes] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const typesData = await getTypes();
                setTypes(typesData);
            } catch (error) {
                setError('Error fetching types');
            }
        };

        fetchTypes();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const missionObject = {
            title,
            description,
            wanted,
            type: +(type),
        };

        try {
            const userToken = JSON.parse(localStorage.getItem('user_token')).token;
            await createHunt(missionObject, userToken);
            navigate('/hunt');
        } catch (error) {
            setError('An error occurred');
        }
    };

    return (
        <div>
            <h2>Create Mission</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="wanted">Wanted:</label>
                    <input
                        type="text"
                        id="wanted"
                        value={wanted}
                        onChange={(e) => setWanted(e.target.value)}
                    />
                </div>
                <div>
                    <label>Type:</label>
                    {types.map((typeItem) => (
                        <div key={typeItem.id}>
                            <input
                                type="radio"
                                id={typeItem.id}
                                name="type"
                                value={typeItem.id}
                                checked={type === typeItem.id.toString()}
                                onChange={(e) => setType(e.target.value)}
                            />
                            <label htmlFor={typeItem.id}>{typeItem.name}</label>
                        </div>
                    ))}
                </div>
                <button type="submit">Create Mission</button>
            </form>
        </div>
    );
};

export default CreateMission;