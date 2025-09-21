import axios, { AxiosResponse } from "axios";
import { API_HOST } from "../services/host";

export const api = axios.create({
  baseURL: API_HOST,
});

api.interceptors.response.use((res: AxiosResponse) => res.data);
