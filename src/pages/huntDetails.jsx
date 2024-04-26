import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHuntDetails } from '../data/huntFetches';
import { deleteHunt } from '../data/huntFetches';

const HuntDetails = () => {
    const { huntId } = useParams();
    const [hunt, setHunt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHuntDetails = async () => {
            try {
                const userToken = JSON.parse(localStorage.getItem('user_token')).token;
                setUserToken(userToken);
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

    const handleDeleteHunt = async () => {
        try {
            await deleteHunt(hunt.id, userToken);
            window.location.href = '/hunt';
        } catch (error) {
            console.error('Error deleting hunt:', error);
            window.location.href = '/hunt';
        }
    };

    const handleEditHunt = () => {
        navigate(`/editHunt/${huntId}`);
    };

    const canEditOrDelete = hunt && userToken === hunt.token;

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
        <>
            <div>
                <h2>{hunt.title}</h2>
                <p>{hunt.description}</p>
                <p>Hunter: {hunt.hunter_name}</p>
                <p>Wanted: {hunt.wanted_id}</p>
                <p>Type: {hunt.type.name}</p>
            </div>
            {canEditOrDelete && (
                <div>
                    <button onClick={handleEditHunt}>Edit</button>
                    <button onClick={handleDeleteHunt}>Delete</button>
                </div>
            )}
        </>
    );
};

export default HuntDetails;