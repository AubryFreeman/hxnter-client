import { useState, useEffect } from 'react';
import { createHunt, getTypes, getWantedPersons } from '../data/huntFetches.jsx';
import { useNavigate } from 'react-router-dom';

const CreateMission = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [wanted, setWanted] = useState(null);
  const [type, setType] = useState('');
  const [types, setTypes] = useState([]);
  const [wantedPersons, setWantedPersons] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = JSON.parse(localStorage.getItem('user_token')).token;
        const typesData = await getTypes();
        const wantedData = await getWantedPersons(userToken);
        setTypes(typesData);
        setWantedPersons(wantedData);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const missionObject = {
      title,
      description,
      wanted: wanted ? wanted.id : '', 
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
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div>
          <label htmlFor="wanted">Wanted:</label>
          <select
            id="wanted"
            value={wanted ? wanted.id : ''}
            onChange={(e) => {
              const selectedPerson = wantedPersons.find((person) => person.id === parseInt(e.target.value));
              setWanted(selectedPerson || null);
            }}
          >
            <option value="">Select a wanted person</option>
            {wantedPersons.map((person) => (
              <option key={`${person.id}-${person.name}`} value={person.id}>
                {person.full_name}
              </option>
            ))}
          </select>
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
