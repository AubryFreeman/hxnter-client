import { useEffect, useState } from 'react';
import { getAllHunts } from '../data/huntFetches.jsx';
import { Link } from 'react-router-dom';

const Hunt = () => {
  const [hunts, setHunts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHunts = async () => {
      try {
        const userToken = JSON.parse(localStorage.getItem('user_token')).token;
        const huntsData = await getAllHunts(userToken);
        setHunts(huntsData);
      } catch (error) {
        setError('Error fetching hunts');
      } finally {
        setLoading(false);
      }
    };

    fetchHunts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Hunt List</h2>
      {hunts.length === 0 ? (
        <p>No hunts available</p>
      ) : (
        <ul>
          {hunts.map((hunt) => (
            <li key={hunt.id}>
              <Link to={`/huntDetails/${hunt.id}`}>
                <h3>{hunt.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/create">
        <button style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          Create Hunt
        </button>
      </Link>
    </div>
  );
};

export default Hunt;