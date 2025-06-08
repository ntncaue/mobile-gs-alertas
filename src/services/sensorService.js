import api from './api';

export const getSensores = () => api.get('/Sensor');
export const getSensorById = (id) => api.get(`/Sensor/${id}`);
export const createSensor = (data) => api.post('/Sensor', data);
export const updateSensor = (id, data) => api.put(`/Sensor/${id}`, data);
export const deleteSensor = (id) => api.delete(`/Sensor/${id}`); 