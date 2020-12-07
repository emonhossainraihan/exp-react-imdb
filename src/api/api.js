import axios from "axios";

require('dotenv').config();
console.log(process.env.REACT_APP_TMDB_API)
export default axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  params: {
    api_key: process.env.REACT_APP_TMDB_API,
  },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
