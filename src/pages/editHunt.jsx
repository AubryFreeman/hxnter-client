import { useState, useEffect } from 'react';
import { getHuntDetails, editHunt, getTypes } from '../data/huntFetches';
import { useParams, useNavigate } from 'react-router-dom';

const EditHunt = () => {
    const { huntId } = useParams();
    const navigate = useNavigate();
    const [huntData, setHuntData] = useState({
        hunter_name: '',
        title: '',
        description: '',
        wanted: '',
        type: '', // Change to type
    });
    const [types, setTypes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHuntDetails = async () => {
            try {
                const userToken = JSON.parse(localStorage.getItem('user_token')).token;
                const data = await getHuntDetails(huntId, userToken);
                console.log(data)
                setHuntData({
                    hunter_name: data.hunter_name,
                    title: data.title,
                    description: data.description,
                    wanted: data.wanted_id,
                    type: data.type.id.toString(), // Convert type ID to string
                });
            } catch (error) {
                setError('Error fetching hunt details');
            }
        };

        const fetchTypes = async () => {
            try {
                const typesData = await getTypes();
                setTypes(typesData);
            } catch (error) {
                setError('Error fetching types');
            }
        };

        fetchHuntDetails();
        fetchTypes();
    }, [huntId]);

    const handleChange = (e) => {
        setHuntData({ ...huntData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userToken = JSON.parse(localStorage.getItem('user_token')).token;
            await editHunt(huntId, huntData, userToken);
            navigate('/hunt');
        } catch (error) {
            console.error('Error updating hunt:', error);
            setError('Error updating hunt');
        }
    };

    return (
        <div>
            <h2>Edit Hunt</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Hunter:</label>
                    <span>{huntData.hunter_name}</span>
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={huntData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={huntData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="wanted">Wanted:</label>
                    <input
                        type="text"
                        id="wanted"
                        name="wanted"
                        value={huntData.wanted}
                        onChange={handleChange}
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
                                value={typeItem.id.toString()} // Convert type ID to string
                                checked={huntData.type === typeItem.id.toString()} // Check against string value
                                onChange={handleChange}
                            />
                            <label htmlFor={typeItem.id}>{typeItem.name}</label>
                        </div>
                    ))}
                </div>
                <button type="submit">Update Hunt</button>
            </form>
        </div>
    );
};

export default EditHunt;

