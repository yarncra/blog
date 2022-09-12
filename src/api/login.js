import axios from "@/api/axios";

const login = (credentials) => {
  return axios.post("/users/login", {
    user: credentials,
  });
};

export default {
  login,
};
