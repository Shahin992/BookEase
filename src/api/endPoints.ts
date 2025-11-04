export const USER_ENDPOINTS = {
  signUp: '/api/auth/signup',
  signIn: '/api/auth/signin'
};

export const SERVICES_ENDPOINTS = {
  getAllServices: '/api/services/',
  getService: (id: string) => `/api/services/${id}`
};

export const BOOKING_ENDPOINTS = {
  createBooking: '/api/bookings'
}
