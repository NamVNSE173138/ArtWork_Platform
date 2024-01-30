import axios, { AxiosInstance } from "axios";

// Use your local API URL
const localApiUrl = "http://localhost:5000/artwork";

const unsplash: AxiosInstance = axios.create({
  baseURL: localApiUrl,
  headers: {
    Authorization: "Client-ID gnITd_as19J-8akX36iY6Dii-QB8QoyuJrdqpOxf_V4",
  },
});

export default unsplash;
