export const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3001/orders");
      return await response.json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  };
  