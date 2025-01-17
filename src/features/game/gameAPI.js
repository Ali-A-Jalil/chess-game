export const saveGameResult = async (result) => {
    try {
      const response = await fetch('/api/saveResult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });
      if (!response.ok) throw new Error('Failed to save result');
    } catch (error) {
      console.error('Error saving result:', error);
      throw error;
    }
  };
  
  export const fetchGameResults = async () => {
    try {
      const response = await fetch('/api/getResults');
      if (!response.ok) throw new Error('Failed to fetch results');
      return await response.json();
    } catch (error) {
      console.error('Error fetching results:', error);
      throw error;
    }
  };
  