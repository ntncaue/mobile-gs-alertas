import api from './api';

export const getAreas = () => api.get('/AreaMonitorada');
export const getAreaById = (id) => api.get(`/AreaMonitorada/${id}`);
export const createArea = (data) => api.post('/AreaMonitorada', data);
export const updateArea = (id, data) => api.put(`/AreaMonitorada/${id}`, data);
export const deleteArea = (id) => api.delete(`/AreaMonitorada/${id}`); 