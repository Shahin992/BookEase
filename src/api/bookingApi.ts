import { CheckConflictPayload, CreateBookingRequest, IApiResponse, IBooking } from "@/data/mockReservations";
import { apiRequest } from "./apiClient";
import { BOOKING_ENDPOINTS } from "./endPoints";


interface IUser  {
  userId: string
}
// Create booking
export const createBooking = async (payload: CreateBookingRequest): Promise<IApiResponse<IBooking>> =>
  apiRequest<IApiResponse<IBooking>>("post", BOOKING_ENDPOINTS.createBooking, payload);

export const getUserBookings = async (payload: IUser): Promise<IApiResponse<IBooking[]>> =>
  apiRequest<IApiResponse<IBooking[]>>("post", BOOKING_ENDPOINTS.getUserBookings, payload);

export const checkBookingConflictApi = async (payload: CheckConflictPayload): Promise<IApiResponse<any>> => {
  return apiRequest<IApiResponse<any>>("post", BOOKING_ENDPOINTS.checkAvailability, payload);
};

export const updateBookingDates = async (
  payload: { bookingId: string; checkInDate: string; checkOutDate: string }
): Promise<IApiResponse<IBooking>> =>
  apiRequest<IApiResponse<IBooking>>(
    "put",
    BOOKING_ENDPOINTS.updateBookingDates,
    payload
  );

  export const cancelBooking = async (
  payload: { bookingId: string }
): Promise<IApiResponse<IBooking>> =>
  apiRequest<IApiResponse<IBooking>>(
    "patch",
    BOOKING_ENDPOINTS.cancelBooking,
    payload
  );

// // Get all bookings
// export const getAllBookings = async (): Promise<IApiResponse<IBooking[]>> =>
//   apiRequest<IApiResponse<IBooking[]>>("get", BOOKING_ENDPOINTS.getAllBookings);

// // Get single booking
// export const getBooking = async (id: string): Promise<IApiResponse<IBooking>> =>
//   apiRequest<IApiResponse<IBooking>>( "get", BOOKING_ENDPOINTS.getBooking.replace(":id", id) );