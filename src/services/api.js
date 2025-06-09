import axios from 'axios';

const api = axios.create({
  baseURL: '', // IP da sua máquina e porta 5212 (HTTP) exemplo: http://192.168.0.999:5212/api
});

export default api; 