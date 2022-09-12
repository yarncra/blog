import axios from "@/api/axios";

const api = {
  getAuthorFeed(slug, page) {
    return axios.get(
      `/articles?author=${slug}&limit=5&offset=${page ? (page - 1) * 5 : 0}`
    );
  },

  getFavoritedFeed(slug, page) {
    return axios.get(
      `/articles?favorited=${slug}&limit=5&offset=${page ? (page - 1) * 5 : 0}`
    );
  },

  postFavorite(slug) {
    return axios.post(`/articles/${slug}/favorite`);
  },
  deleteFavorite(slug) {
    return axios.delete(`/articles/${slug}/favorite`);
  },
};

export default api;
