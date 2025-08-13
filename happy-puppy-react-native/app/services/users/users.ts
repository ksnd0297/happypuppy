import axios, { AxiosResponse } from "axios";
import { GetUsersCheckParams, GetUsersParams, UserCheckResponse, UserRegisterRequest, UserResponse } from "./types";

export function postUsers(params: UserRegisterRequest): Promise<AxiosResponse<UserResponse>> {
  return axios.post<UserResponse>(`http://localhost:8080/users`, params);
}

export function getUsers(params: GetUsersParams): Promise<AxiosResponse<UserResponse>> {
  return axios.get<UserResponse>(`http://localhost:8080/users/${params.id}`);
}

export function getUsersCheck(params: GetUsersCheckParams): Promise<AxiosResponse<UserCheckResponse>> {
  return axios.get<UserCheckResponse>(`http://localhost:8080/users/check`, {
    params,
  });
}
