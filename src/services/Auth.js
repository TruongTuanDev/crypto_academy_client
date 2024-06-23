import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const register = (phone,fullName, password,idCountry) => {
  return axios.post(API_URL + "signup", {
    phone,
    fullName,
    password,
    idCountry
  });
};
const AuthService = {
  register,
}

export default AuthService;