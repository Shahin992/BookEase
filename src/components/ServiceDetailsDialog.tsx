import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Calendar } from "lucide-react";

interface ServiceDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: {
    id: number;
    title: string;
    type: string;
    location: string;
    price: number;
    image: string;
    available: boolean;
  };
  onBookNow: () => void;
}

const ServiceDetailsDialog = ({ open, onOpenChange, reservation, onBookNow }: ServiceDetailsDialogProps) => {
  const getServiceDescription = (type: string) => {
    switch (type) {
      case "Resort":
        return "Experience luxury and comfort in this premium resort. Enjoy world-class amenities, stunning views, and exceptional service. Perfect for romantic getaways, family vacations, or solo retreats.";
      case "Vehicle":
        return "Drive in style with this premium vehicle. Whether for business or pleasure, enjoy a smooth ride with top-tier comfort and performance. Professional maintenance and 24/7 support included.";
      case "Conference Hall":
        return "Host your events in this professional conference space. Equipped with state-of-the-art technology, flexible seating arrangements, and excellent acoustics. Perfect for meetings, seminars, and corporate events.";
      default:
        return "Discover this premium service tailored to your needs. Book now to experience exceptional quality and service.";
    }
  };

  const getServiceFeatures = (type: string) => {
    switch (type) {
      case "Resort":
        return [
          "Swimming pool and spa facilities",
          "24/7 room service",
          "Fine dining restaurants",
          "Fitness center and activities",
          "Concierge services"
        ];
      case "Vehicle":
        return [
          "Comprehensive insurance coverage",
          "GPS navigation system",
          "24/7 roadside assistance",
          "Unlimited mileage",
          "Professional detailing"
        ];
      case "Conference Hall":
        return [
          "High-speed WiFi connectivity",
          "Audio-visual equipment",
          "Catering services available",
          "Technical support staff",
          "Flexible seating arrangements"
        ];
      default:
        return ["Premium quality", "Professional service", "Flexible booking"];
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {reservation.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative h-72 overflow-hidden rounded-lg">
            <img 
              src={reservation.image} 
              alt={reservation.title}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-lg px-4 py-2">
              {reservation.type}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium">{reservation.location}</span>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-blue-50 p-6 rounded-lg border-2 border-primary/20">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <div className="text-4xl font-bold text-primary">${reservation.price}</div>
                <div className="text-muted-foreground">per day</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">About This Service</h3>
            <p className="text-muted-foreground leading-relaxed">
              {getServiceDescription(reservation.type)}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Features & Amenities</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getServiceFeatures(reservation.type).map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-lg" 
              size="lg"
              onClick={onBookNow}
              disabled={!reservation.available}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {reservation.available ? "Book Now" : "Unavailable"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailsDialog;
