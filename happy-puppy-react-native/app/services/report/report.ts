import { API_HOST } from "../host";
import { UserRegisterRequest, UserResponse } from "./types";
import { api } from "@/app/utils/api";

export function postReport(params: UserRegisterRequest): Promise<UserResponse> {
  return api.post(`${API_HOST}/users`, params);
}
