import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://opentdb.com",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiInstance