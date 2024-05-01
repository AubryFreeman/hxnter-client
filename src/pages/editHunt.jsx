import { useState, useEffect } from "react";
import {
  getHuntDetails,
  editHunt,
  getTypes,
  getWantedPersons,
} from "../data/huntFetches";
import { useParams, useNavigate } from "react-router-dom";

const EditHunt = () => {
  const { huntId } = useParams();
  const navigate = useNavigate();
  const [huntData, setHuntData] = useState({
    hunter_name: "",
    title: "",
    description: "",
    wanted: "",
    type: "",
  });
  const [types, setTypes] = useState([]);
  const [wantedPersons, setWantedPersons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = JSON.parse(localStorage.getItem("user_token")).token;
        const typesData = await getTypes();
        setTypes(typesData);

        // Fetch wanted persons
        const wantedData = await getWantedPersons(userToken);
        setWantedPersons(wantedData);
        const huntDetails = await getHuntDetails(huntId, userToken);
        setHuntData({
          hunter_name: huntDetails.hunter_name,
          title: huntDetails.title,
          description: huntDetails.description,
          wanted: huntDetails.wanted ? huntDetails.wanted.id : "",
          type: huntDetails.type.id.toString(),
        });
      } catch (error) {
        setError("Error fetching data");
      }
    };

    fetchData();
  }, [huntId]);

  const handleChange = (e) => {
    setHuntData({ ...huntData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userToken = JSON.parse(localStorage.getItem("user_token")).token;
      await editHunt(huntId, huntData, userToken);
      navigate("/hunt");
    } catch (error) {
      console.error("Error updating hunt:", error);
      setError("Error updating hunt");
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
          <select
            id="wanted"
            name="wanted"
            value={huntData.wanted}
            onChange={handleChange}
          >
            <option value={""} disabled>
              Select a wanted person
            </option>
            {wantedPersons.map((person) => (
              <option key={person.id} value={person.id}>
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
                value={typeItem.id.toString()}
                checked={huntData.type === typeItem.id.toString()}
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

