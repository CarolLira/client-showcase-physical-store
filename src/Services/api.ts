import axios from 'axios';

const api = axios.create({
  baseURL: 'https://physical-store-server.herokuapp.com/',
});

export default api;
