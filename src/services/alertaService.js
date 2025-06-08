import api from './api';

export const getAlertas = () => api.get('/AlertaIncendio');
export const getAlertaById = (id) => api.get(`/AlertaIncendio/${id}`);
export const createAlerta = (data) => api.post('/AlertaIncendio', data);
export const updateAlerta = (id, data) => api.put(`/AlertaIncendio/${id}`, data);
export const deleteAlerta = (id) => api.delete(`/AlertaIncendio/${id}`); 