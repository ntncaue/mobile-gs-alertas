import api from './api';

export const getLeituras = () => api.get('/LeituraSensor');
export const getLeituraById = (id) => api.get(`/LeituraSensor/${id}`);
export const createLeitura = (data) => api.post('/LeituraSensor', data);
export const updateLeitura = (id, data) => api.put(`/LeituraSensor/${id}`, data);
export const deleteLeitura = (id) => api.delete(`/LeituraSensor/${id}`); 