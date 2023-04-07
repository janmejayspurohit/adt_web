import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function setAxiosHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common["Authorization"] = "";
  }
}
