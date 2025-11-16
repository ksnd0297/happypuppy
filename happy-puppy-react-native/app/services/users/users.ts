import { API_HOST } from "../host";
import { GetUsersCheckParams, GetUsersParams, UpdateUserRequest, UserCheckResponse, UserRegisterRequest, UserResponse } from "./types";
import { api } from "@/app/utils/api";

export function postUsers(params: UserRegisterRequest): Promise<UserResponse> {
  return api.post(`${API_HOST}/users`, params);
}

export function getUsers(params: GetUsersParams): Promise<UserResponse> {
  return api.get(`${API_HOST}/users/${params.id}`);
}

export function getUsersCheck(params: GetUsersCheckParams): Promise<UserCheckResponse> {
  return api.get(`${API_HOST}/users/check`, {
    params,
  });
}

export function putUsers(params: UpdateUserRequest): Promise<UserResponse> {
  return api.put(`${API_HOST}/users/${params.id}`, params.params);
}

export function withdrawUsers(userId: number): Promise<void> {
  return api.post(`${API_HOST}/users:withdraw`, {
    userId,
  });
}
