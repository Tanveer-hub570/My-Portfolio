export const fetchTransactions = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      return data.slice(0, 10); // Mock transactions
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  };
  