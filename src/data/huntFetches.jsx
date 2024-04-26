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

  export const getTypes = async () => {
    try {
        const userToken = JSON.parse(localStorage.getItem('user_token')).token;
        const response = await fetch('http://localhost:8000/types', {
            headers: {
                'Authorization': `Token ${userToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch types');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching types', error);
        throw error;
    }
};



  export const deleteHunt = async (huntId, user_token) => {
    try {
      const response = await fetch(`http://localhost:8000/missions/${huntId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${user_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(huntId),
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete hunt");
      }
  
      return response.json();
    } catch (error) {
      console.error("Error deleting hunt", error);
      throw error;
    }
  };

  export const editHunt = async (huntId, huntData, user_token) => {
    try {
     await fetch(`http://localhost:8000/missions/${huntId}`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${user_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(huntData), 
      }).then(
        (response) => {

            if (!response.ok) {
              throw new Error("Failed to edit hunt");
            }
        }
      );
  
    } catch (error) {
      console.error("Error editing hunt", error);
      throw error;
    }
  };