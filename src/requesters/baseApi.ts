import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4500/api",
});

const token = localStorage.getItem('@STOCKCHECKAuth:token');

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}` 
}

export default api;