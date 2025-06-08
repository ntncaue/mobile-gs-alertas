import api from './api';

export const getEquipes = () => api.get('/EquipeResposta');
export const getEquipeById = (id) => api.get(`/EquipeResposta/${id}`);
export const createEquipe = (data) => api.post('/EquipeResposta', data);
export const updateEquipe = (id, data) => api.put(`/EquipeResposta/${id}`, data);
export const deleteEquipe = (id) => api.delete(`/EquipeResposta/${id}`); 