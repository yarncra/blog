import axios from "@/api/axios";

const api = {
  getProfile(slug) {
    return axios.get(`/profiles/${slug}`);
  },
  follow(slug) {
    return axios.post(`/profiles/${slug}/follow`);
  },
  unfollow(slug) {
    return axios.delete(`/profiles/${slug}/follow`);
  },
};

export default api;
