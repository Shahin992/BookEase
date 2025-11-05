export const USER_ENDPOINTS = {
  signUp: '/api/auth/signup',
  signIn: '/api/auth/signin'
};

export const SERVICES_ENDPOINTS = {
  getAllServices: '/api/services/',
  getService: (id: string) => `/api/services/${id}`
};

export const BOOKING_ENDPOINTS = {
  createBooking: '/api/bookings',
  getUserBookings: '/api/bookings/my-bookings',
  checkAvailability: '/api/bookings/service-availability',
  updateBookingDates: "/api/bookings/update-dates",
  cancelBooking: '/api/bookings/cancel-booking'
}
