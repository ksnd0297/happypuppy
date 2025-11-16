import { api } from "@/app/utils/api";
import { API_HOST } from "../host";
import { GetPlaceRequest, PlaceResponse } from "./types";

export function getPlace(params: GetPlaceRequest): Promise<PlaceResponse[]> {
  return api.get(`${API_HOST}/places/nearby`, {
    params,
  });
}
