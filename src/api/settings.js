import axios from "axios";

const api = {
  updateSettings(user) {
    return axios.put("/user", { user: user });
  },
};

export default api;
