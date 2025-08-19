import axios from "axios";

export const ecoshareApi = axios.create({
  baseURL: "http://localhost:3002/api/v1",
});
