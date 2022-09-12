import axios from '@/api/axios';

const api = {
  register(credentials) {
    return axios.post('/users', {
      user: credentials,
    });
  },

  login(credentials) {
    return axios.post('/users/login', {
      user: credentials,
    });
  },

  getCurrentUser() {
    return axios.get('/user');
  },
};

export default api;
