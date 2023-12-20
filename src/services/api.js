import axios from "axios";

export const api = axios.create({
  baseURL: "https://notes-api-1hpc.onrender.com",
});
