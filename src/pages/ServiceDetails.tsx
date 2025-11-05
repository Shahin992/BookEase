import { useNavigate, useLocation, useParams } from "react-router-dom";
import type { Reservation } from "@/data/mockReservations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingDialog from "@/components/BookingDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, ArrowLeft, Calendar, Users, Wifi, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getServiceById } from "@/api/servicesApi";
import { array } from "zod";
import ServiceDetailsSkeleton from "@/components/ServiceDetailsSkeleton";
import { useAuth } from "@/Context/AuthContext";

const ServiceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user,  isAuthenticated } = useAuth();


  useEffect(() => {
    const fetchReservation = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await getServiceById(id);
        if (response.success) {
          setReservation(response.data);
        } else {
          setError(response.message || "Failed to fetch reservation.");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, []);

  const getServiceDescription = (type: string) => {
    switch (type) {
      case 'Resort':
        return 'Indulge in luxury and comfort at our premium resort destinations. Each property offers world-class amenities, breathtaking views, and exceptional service to make your stay unforgettable.';
      case 'Vehicle':
        return 'Experience the thrill of driving premium vehicles. Our fleet is maintained to the highest standards, offering you comfort, style, and performance for your journey.';
      case 'Conference Hall':
        return 'Host successful events in our professional conference facilities. Equipped with modern technology and flexible spaces to accommodate your business needs.';
      default:
        return 'Premium service tailored to exceed your expectations.';
    }
  };

  const getServiceFeatures = (type: string) => {
    switch (type) {
      case 'Resort':
        return ['24/7 Concierge', 'Spa & Wellness', 'Fine Dining', 'Ocean Views', 'Private Beach Access'];
      case 'Vehicle':
        return ['Premium Insurance', 'GPS Navigation', 'Leather Interiors', '24/7 Support', 'Free Delivery'];
      case 'Conference Hall':
        return ['High-Speed WiFi', 'AV Equipment', 'Catering Service', 'Parking Available', 'Technical Support'];
      default:
        return ['Premium Service', 'Professional Staff', 'Modern Facilities'];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

    { loading ? (<ServiceDetailsSkeleton/>) :
     !loading &&  reservation ? ( 
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/services')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>

      
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <img
                src={reservation.image}
                alt={reservation.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-lg px-4 py-2">
                {reservation.type}
              </Badge>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {reservation.title}
              </h1>
              
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{reservation.location}</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="h-8 w-8 text-primary" />
                <div>
                  <span className="text-4xl font-bold text-primary">${reservation.price}</span>
                  <span className="text-muted-foreground ml-2">/day</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-muted-foreground ml-2">(4.9 / 5.0)</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {getServiceDescription(reservation.type)}
              </p>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 gap-3">
                {getServiceFeatures(reservation.type).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">Flexible Dates</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">Group Friendly</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <Wifi className="h-6 w-6 text-primary mb-2" />
                  <span className="text-sm text-muted-foreground">Free WiFi</span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg text-lg py-6"
                onClick={() => {
                  if (!isAuthenticated){
                    navigate('/signin')
                  }
                  setBookingDialogOpen(true)}
                }
                disabled={!reservation.available}
              >
                {reservation.available ? "Book Now" : "Currently Unavailable"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    ) : <div>no data found</div>}

      {bookingDialogOpen && (
        <BookingDialog
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
          reservation={reservation}
        />
      )}

      <Footer />
    </div>
  );
};

export default ServiceDetails;
