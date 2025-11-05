import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EditBookingDialog } from "@/components/EditBookingDialog";
import {
  Search,
  X,
  Hotel,
  Car,
  Building2,
  Calendar,
  MapPin,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { cancelBooking, getUserBookings, updateBookingDates } from "@/api/bookingApi";
import { IBooking } from "@/data/mockReservations";
import { useAuth } from "@/Context/AuthContext";
import MyBookingsSkeleton from "@/components/MyBookingsSkeleton";

export interface Booking {
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
  totalPrice: number;
  bookingStatus: "Upcoming" | "Completed" | "Cancelled";
  paymentStatus: "Pending" | "Paid" | "Cancelled";
}

const MyBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
   

  fetchBookings();
  }, []);

   const fetchBookings = async () => {
      try {
        const userId = user._id;
        const response = await getUserBookings({userId});
        if (response.success) {
          setBookings(response.data);
        } else {
          toast.error(response.message || "Failed to fetch bookings");
        }
      } catch (error: any) {
        console.error("Error fetching bookings:", error);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "Resort":
        return <Hotel className="h-5 w-5" />;
      case "Vehicle":
        return <Car className="h-5 w-5" />;
      case "Conference Hall":
        return <Building2 className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
      case "Completed":
        return "default";
      case "Cancelled":
        return "destructive";
      case "Upcoming":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getPaymentColor = (status: string) => {
    return status === "Paid" ? "default" : "outline";
  };

  const handleCancel = async (bookingId: string) => {
  try {
    const response = await cancelBooking({ bookingId });

    if (response.success) {
      // Update the bookings state
      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, bookingStatus: "Cancelled" }
            : booking
        )
      );

      toast.success("Booking cancelled successfully");

      // Close the dialog and reset selected booking
      setCancelDialogOpen(false);
      setSelectedBooking(null);
    } else {
      toast.error(response.message || "Failed to cancel booking");
    }
  } catch (error: any) {
    const msg =
      error.response?.data?.message || error.message || "Something went wrong";
    toast.error(msg);
  }
};


  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    await fetchBookings();
  };

  const openCancelDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setCancelDialogOpen(true);
  };

  const canModifyBooking = (checkInDate: string) => {
    const checkIn = new Date(checkInDate);
    const today = new Date();
    const oneDayBeforeCheckIn = new Date(checkIn);
    oneDayBeforeCheckIn.setDate(checkIn.getDate() - 1);
    return today <= oneDayBeforeCheckIn;
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.service.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      booking.bookingStatus.toLowerCase() === filterStatus;
    const matchesType =
      filterType === "all" ||
      booking.service.type.toLowerCase() === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-foreground transition-colors">
            Home
          </a>
          <span>/</span>
          <span className="text-foreground font-medium">My Bookings</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">
            View and manage all your reservations
          </p>
        </div>

<div>

</div>
{loading ? <MyBookingsSkeleton/> : (
  <div>
   <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by booking ID or service name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            /> */}
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="resort">Resort</SelectItem>
              <SelectItem value="vehicle">Vehicle</SelectItem>
              <SelectItem value="conference hall">Conference Hall</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings Grid */}
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground text-lg mb-2">
                No bookings found
              </p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredBookings.map((booking) => (
              <Card
                key={booking._id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {getServiceIcon(booking.service.type)}
                      <div>
                        <CardTitle className="text-xl">
                          {booking.service.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Booking ID: {booking.bookingId}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(booking.bookingStatus)}>
                        {booking.bookingStatus}
                      </Badge>
                      <Badge variant={getPaymentColor(booking.paymentStatus)}>
                        {booking.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Check-In</p>
                        <p className="text-sm font-medium">
                          {new Date(
                            booking.checkInDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Check-Out
                        </p>
                        <p className="text-sm font-medium">
                          {new Date(
                            booking.checkOutDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Total Price
                        </p>
                        <p className="text-sm font-medium">
                          ${booking.totalPrice}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Service Type
                        </p>
                        <p className="text-sm font-medium">
                          {booking.service.type}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {canModifyBooking(booking.checkInDate) &&
                      booking.bookingStatus !== "Cancelled" &&
                      booking.bookingStatus !== "Completed" && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(booking)}
                          >
                            Edit Booking
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openCancelDialog(booking)}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel Booking
                          </Button>
                        </>
                      )}
                    {!canModifyBooking(booking.checkInDate) &&
                      booking.bookingStatus !== "Cancelled" &&
                      booking.bookingStatus !== "Completed" && (
                        <p className="text-sm text-muted-foreground">
                          Cannot modify booking within 1 day of check-in
                        </p>
                      )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
</div>
)}
        {/* Filters */}
       
      </main>

      {selectedBooking && (
        <>
          <EditBookingDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            bookingId={selectedBooking._id}
            serviceName={selectedBooking.service.title}
            currentCheckIn={selectedBooking.checkInDate}
            currentCheckOut={selectedBooking.checkOutDate}
            onSave={handleSaveEdit}
          />

          <AlertDialog
            open={cancelDialogOpen}
            onOpenChange={setCancelDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader className="items-center text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <AlertDialogTitle className="text-center">
                  Cancel Booking
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  Are you sure you want to cancel your booking for{" "}
                  {selectedBooking.service.title}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleCancel(selectedBooking._id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Cancel Booking
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      <Footer />
    </div>
  );
};

export default MyBookings;
