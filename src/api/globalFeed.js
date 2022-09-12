import axios from "@/api/axios";

const api = {
  getGlobalFeed(page) {
    return axios.get(`/articles?limit=5&offset=${page ? (page - 1) * 5 : 0}`);
  },
  postFavorite(slug) {
    return axios.post(`/articles/${slug}/favorite`);
  },
  deleteFavorite(slug) {
    return axios.delete(`/articles/${slug}/favorite`);
  },
};

export default api;
