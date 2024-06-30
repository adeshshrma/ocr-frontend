import axios from "axios";

export const instance = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "https://ocr-backend-latest.onrender.com",
});
