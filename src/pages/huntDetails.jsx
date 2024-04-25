import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHuntDetails } from '../data/huntFetches';

const HuntDetails = () => {
  const { huntId } = useParams();
  const [hunt, setHunt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHuntDetails = async () => {
      try {
        const userToken = JSON.parse(localStorage.getItem('user_token')).token;
        const huntData = await getHuntDetails(huntId, userToken);
        setHunt(huntData);
      } catch (error) {
        setError('Error fetching hunt details');
      } finally {
        setLoading(false);
      }
    };

    fetchHuntDetails();
  }, [huntId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!hunt) {
    return <div>Hunt not found</div>;
  }

  return (
    <div>
      <h2>{hunt.title}</h2>
      <p>{hunt.description}</p>
      <p>Hunter: {hunt.hunter}</p>
      <p>Wanted: {hunt.wanted}</p>
      <p>Type: {hunt.type}</p>
    </div>
  );
};

export default HuntDetails;