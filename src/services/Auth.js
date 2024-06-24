import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

const register = async (phone, fullName, password, selectedCountry) => {
  try {
    const response = await axios.post(API_URL + 'signup', {
      phone,
      fullName,
      password,
      selectedCountry
    });
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

const AuthService = {
  register
};

export default AuthService;
