import { GetUsersCheckParams, GetUsersParams, UpdateUserRequest, UserCheckResponse, UserRegisterRequest, UserResponse } from "./types";
import { api } from "@/app/utils/api";

export function postUsers(params: UserRegisterRequest): Promise<UserResponse> {
  return api.post(`http://localhost:8080/users`, params);
}

export function getUsers(params: GetUsersParams): Promise<UserResponse> {
  return api.get(`http://localhost:8080/users/${params.id}`);
}

export function getUsersCheck(params: GetUsersCheckParams): Promise<UserCheckResponse> {
  return api.get(`http://localhost:8080/users/check`, {
    params,
  });
}

export function putUsers(params: UpdateUserRequest): Promise<UserResponse> {
  return api.put(`http://localhost:8080/users/${params.id}`, params.params);
}
