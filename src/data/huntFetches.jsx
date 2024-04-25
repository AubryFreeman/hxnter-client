export const createHunt = async (obj, user_token) => {
    try {
      const response = await fetch(`http://localhost:8000/missions`, {
        method: "POST",
        headers: {
          Authorization: `Token ${user_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create hunt");
      }
  
      return response.json();
    } catch (error) {
      console.error("Error creating hunt", error);
      throw error;
    }
  };

  export const getAllHunts = async (user_token) => {
    try {
      const response = await fetch(`http://localhost:8000/missions`, {
        headers: {
          Authorization: `Token ${user_token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch hunts");
      }
  
      return response.json();
    } catch (error) {
      console.error("Error fetching hunts", error);
      throw error;
    }
  };

  export const getHuntDetails = async (huntId, user_token) => {
    try {
      const response = await fetch(`http://localhost:8000/missions/${huntId}`, {
        headers: {
          Authorization: `Token ${user_token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch hunt details");
      }
  
      return response.json();
    } catch (error) {
      console.error("Error fetching hunt details", error);
      throw error;
    }
  };