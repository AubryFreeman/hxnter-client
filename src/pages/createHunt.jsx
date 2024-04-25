import { useState } from 'react';
import { createHunt } from '../data/huntFetches.jsx';
import { useNavigate } from 'react-router-dom';

  const CreateMission = () => {
    const [hunter, setHunter] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [wanted, setWanted] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const missionObject = {
        hunter,
        title,
        description,
        wanted,
        type,
      };
  
      try {
        const userToken = JSON.parse(localStorage.getItem('user_token')).token;
        await createHunt(missionObject, userToken);
        console.log('Mission created');
        navigate('/hunt');
      } catch (error) {
        console.error('Error creating mission:', error);
        setError('An error occurred');
      }
    };

  return (
    <div>
      <h2>Create Mission</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="hunter">Hunter ID:</label>
          <input
            type="text"
            id="hunter"
            value={hunter}
            onChange={(e) => setHunter(e.target.value)}
          />
        </div>
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
          <label htmlFor="wanted">Wanted ID:</label>
          <input
            type="text"
            id="wanted"
            value={wanted}
            onChange={(e) => setWanted(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <button type="submit">Create Mission</button>
      </form>
    </div>
  );
};

export default CreateMission;