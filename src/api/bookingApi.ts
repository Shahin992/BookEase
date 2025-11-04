import { CreateBookingRequest, IApiResponse, IBooking } from "@/data/mockReservations";
import { apiRequest } from "./apiClient";
import { BOOKING_ENDPOINTS } from "./endPoints";


// Create booking
export const createBooking = async (payload: CreateBookingRequest): Promise<IApiResponse<IBooking>> =>
  apiRequest<IApiResponse<IBooking>>("post", BOOKING_ENDPOINTS.createBooking, payload);

// // Get all bookings
// export const getAllBookings = async (): Promise<IApiResponse<IBooking[]>> =>
//   apiRequest<IApiResponse<IBooking[]>>("get", BOOKING_ENDPOINTS.getAllBookings);

// // Get single booking
// export const getBooking = async (id: string): Promise<IApiResponse<IBooking>> =>
//   apiRequest<IApiResponse<IBooking>>( "get", BOOKING_ENDPOINTS.getBooking.replace(":id", id) );