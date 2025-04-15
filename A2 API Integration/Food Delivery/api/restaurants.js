export const fetchRestaurants = async () => {
  try {
    const response = await fetch("https://api.sampleapis.com/restaurants/restaurants"); // Example API
    
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Attempt to parse the response as JSON
    const data = await response.json();
    
    // Return the data (assuming it's an array of restaurants)
    return data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return []; // Return an empty array in case of error
  }
};
