import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const login = async (email, password) => {
  console.log('Attempting login to:', `${API_URL}/login`);
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password }, {
      withCredentials: true
    });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchAccounts = async (userId) => {
  console.log('Fetching accounts for userId:', userId);
  try {
    const response = await axios.get(`${API_URL}/accounts`, {
      params: { userId },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error in fetchAccounts:', error.response ? error.response.data : error.message);
    throw error;
  }
};



export const createAccount = async (userId, accountName) => {
  console.log('Creating account for userId:', userId);
  try {
    const response = await axios.post(`${API_URL}/accounts/create`, {
      userId,
      accountName
    }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error in createAccount:', error.response ? error.response.data : error.message);
    throw error;
  }
};




// Remove or comment out these functions if they're not implemented in the backend yet
/*

export const updateAccount = async (address, data) => {
  const response = await axios.put(`${API_URL}/accounts/update/${address}`, data);
  return response.data;
};

export const deleteAccount = async (address) => {
  const response = await axios.delete(`${API_URL}/accounts/delete/${address}`);
  return response.data;
};

export const getAccountBalance = async (address) => {
  const response = await axios.get(`${API_URL}/accounts/balance/${address}`);
  return response.data;
};
*/