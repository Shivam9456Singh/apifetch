import axios from 'axios';

const API_URL = 'https://api.gyanibooks.com/library/get_dummy_notes';

export const getDummyNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching dummy notes:', error);
    throw error;
  }
};