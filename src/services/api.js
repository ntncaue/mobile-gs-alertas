import axios from 'axios';

const api = axios.create({
  baseURL: ' http://192.168.0.113:5212/api', // IP da sua máquina e porta 5212 (HTTP)
});

export default api; 