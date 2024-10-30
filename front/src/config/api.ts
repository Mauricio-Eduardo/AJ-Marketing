import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7179/",
  headers: {
    "Content-Type": "application/json",
  },
});
