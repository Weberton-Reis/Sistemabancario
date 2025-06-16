import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error);
    return Promise.reject(error);
  }
);

export const contasAPI = {
  // Listar todas as contas
  listar: () => api.get('/contas'),
  
  // Buscar conta por ID
  buscarPorId: (id) => api.get(`/contas/${id}`),
  
  // Criar nova conta
  criar: (dados) => api.post('/contas', dados),
  
  // Atualizar conta
  atualizar: (id, dados) => api.put(`/contas/${id}`, dados),
  
  // Excluir conta
  excluir: (id) => api.delete(`/contas/${id}`)
};

export default api;

