import axios from "axios";

const API_URL = "/api/v1/user/";

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  if (response.data.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data.data;
};
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data.data;
};
const update = async (userData) => {
  const response = await axios.patch(API_URL, userData);
  console.log(response);
  if (response.data.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data.data;
};
const logout = () => {
  localStorage.removeItem("user");
};

const serviceAuth = {
  register,
  login,
  logout,
  update,
};

export default serviceAuth;
