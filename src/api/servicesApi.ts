
import { apiRequest } from "./apiClient";
import { SERVICES_ENDPOINTS } from "./endPoints";
import { IApiResponse, Reservation } from "@/data/mockReservations";

export const getAllServices = async (): Promise<IApiResponse<Reservation[]>> =>
  apiRequest<IApiResponse<Reservation[]>>('get', SERVICES_ENDPOINTS.getAllServices);

// Fetch a single service by ID
export const getServiceById = async (id: string): Promise<IApiResponse<Reservation>> =>
  apiRequest<IApiResponse<Reservation>>('get', SERVICES_ENDPOINTS.getService(id));
