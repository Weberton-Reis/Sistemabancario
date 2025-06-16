import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Garanta que a porta é a mesma do backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros (opcional, mas bom para debug)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na chamada da API:', error.response || error.message);
    return Promise.reject(error);
  }
);

export const contasAPI = {
  listar: () => api.get('/contas'),
  buscarPorId: (id) => api.get(`/contas/${id}`),
  criar: (dados) => api.post('/contas', dados),
  atualizar: (id, dados) => api.put(`/contas/${id}`, dados),
  excluir: (id) => api.delete(`/contas/${id}`)
};

export default api;