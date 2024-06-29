import axios from 'axios';
import { loginFailure, loginStart,loginSuccess } from '../redux/authSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/auth',
});

const register = async (phone, fullName, password, selectedCountry) => {
  try {
    const response = await axiosInstance.post('/register', {
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
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try{
    const res = await axiosInstance.post("/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  }catch (error) {
    dispatch(loginFailure());
  }
}

const AuthService = {
  register,
};

export default AuthService;
