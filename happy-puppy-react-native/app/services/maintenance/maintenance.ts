import { api } from "@/app/utils/api";
import { API_HOST } from "../host";
import { MaintenanceResponse, VersionResponse } from "./types";

export function getMaintenance(): Promise<MaintenanceResponse> {
  return api.get(`${API_HOST}/maintenance`);
}

export function getVersion(): Promise<VersionResponse> {
  return api.get(`${API_HOST}/version`);
}
