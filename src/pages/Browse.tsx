import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, MapPin, DollarSign } from "lucide-react";
import { mockReservations, type Reservation } from "@/data/mockReservations";

const Services = () => {
  const navigate = useNavigate();

  const handleViewDetails = (reservation: Reservation) => {
    navigate(`/service/${reservation.id}`, { state: { reservation } });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover premium resorts, luxury vehicles, and professional conference halls for your perfect experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockReservations.map((reservation) => (
            <Card key={reservation.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-primary/50 bg-white">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={reservation.image} 
                  alt={reservation.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">
                  {reservation.type}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{reservation.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {reservation.location}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                    <DollarSign className="h-6 w-6" />
                    {reservation.price}
                    <span className="text-sm text-muted-foreground font-normal">/day</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-lg" 
                  size="lg"
                  onClick={() => handleViewDetails(reservation)}
                  disabled={!reservation.available}
                >
                  <Info className="mr-2 h-4 w-4" />
                  {reservation.available ? "View Details" : "Unavailable"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
