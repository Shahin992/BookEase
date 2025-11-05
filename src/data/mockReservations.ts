export interface Reservation {
  _id: number;
  title: string;
  type: string;
  location: string;
  price: number;
  image: string;
  available: boolean;
  badge?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  statusCode?: number;
  message?: string;
  data: T;
}

export interface CreateBookingRequest {
  serviceId: string;
  checkInDate: string;
  checkOutDate: string;
  totalGuests: number;
  _id: string
}

export interface CheckConflictPayload {
  serviceId: string;
  checkInDate: string;
  checkOutDate: string;
}

export interface IBooking {
  _id: string;
  bookingId: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  service: {
    _id: string;
    title: string;
    price: number;
    image: string;
    type: string;
    location: string;
  };
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
  totalDays: number;
  totalGuests: number;
  totalPrice: number;
  bookingStatus: "Upcoming" | "Completed" | "Cancelled";
  paymentStatus: "Pending" | "Paid" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}



export interface ISignInResponse {
  success: boolean;
  statusCode?: number;
  message?: string;
  data: {
    _id: string;
    fullName: string;
    email: string;
    userId: number;
    token: string;
  };
}

export const mockReservations: Reservation[] = [
  {
    id: 1,
    title: "Sunset Beach Resort",
    type: "Resort",
    location: "Maldives",
    price: 350,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    available: true,
    badge: "Popular"
  },
  {
    id: 2,
    title: "Luxury BMW 7 Series",
    type: "Vehicle",
    location: "Dubai, UAE",
    price: 200,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
    available: true,
    badge: "Premium"
  },
  {
    id: 3,
    title: "Grand Conference Center",
    type: "Conference Hall",
    location: "New York, USA",
    price: 500,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    available: true,
    badge: "Top Rated"
  },
  {
    id: 4,
    title: "Mountain Cabin Retreat",
    type: "Resort",
    location: "Swiss Alps",
    price: 280,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    available: true
  },
  {
    id: 5,
    title: "Tropical Villa",
    type: "Resort",
    location: "Bali, Indonesia",
    price: 320,
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1",
    available: true,
    badge: "Trending"
  },
  {
    id: 6,
    title: "Sports Car Ferrari",
    type: "Vehicle",
    location: "Miami, USA",
    price: 450,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    available: true
  },
  {
    id: 7,
    title: "Executive Meeting Room",
    type: "Conference Hall",
    location: "London, UK",
    price: 380,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    available: true
  },
  {
    id: 8,
    title: "Desert Safari Camp",
    type: "Resort",
    location: "Dubai, UAE",
    price: 220,
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0",
    available: true
  },
  {
    id: 9,
    title: "Luxury Yacht Charter",
    type: "Vehicle",
    location: "Monaco",
    price: 1200,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a",
    available: true
  },
  {
    id: 10,
    title: "Grand Ballroom",
    type: "Conference Hall",
    location: "Paris, France",
    price: 850,
    image: "https://images.unsplash.com/photo-1519167758481-83f29da8c2f6",
    available: true
  },
  {
    id: 11,
    title: "City Penthouse",
    type: "Resort",
    location: "Tokyo, Japan",
    price: 400,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    available: true
  },
  {
    id: 12,
    title: "Classic Convertible",
    type: "Vehicle",
    location: "San Francisco, USA",
    price: 120,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
    available: false
  },
  {
    id: 13,
    title: "Lakeside Cottage",
    type: "Resort",
    location: "Lake Como, Italy",
    price: 260,
    image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9",
    available: true
  },
  {
    id: 14,
    title: "Tesla Model S",
    type: "Vehicle",
    location: "Los Angeles, USA",
    price: 180,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
    available: true
  },
  {
    id: 15,
    title: "Innovation Hub",
    type: "Conference Hall",
    location: "Singapore",
    price: 620,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    available: true
  }
];
