import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hotel, Car, Building2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Reservation } from "@/data/mockReservations";



interface FeaturedServicesProps {
  services: Reservation[]; 
}

const FeaturedServices: React.FC<FeaturedServicesProps> = ({ services }) => {
  


  const getServiceIcon = (type: string) => {
    switch (type) {
      case "Resort":
        return <Hotel className="h-5 w-5 text-primary" />;
      case "Vehicle":
        return <Car className="h-5 w-5 text-primary" />;
      case "Conference Hall":
        return <Building2 className="h-5 w-5 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services?.slice(0, 3).map((service) => {
            return (
              <Link
                key={service._id}
                to={`/service/${service._id}`}
                state={{ reservation: service }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {service.badge && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary/90 backdrop-blur-sm">
                          {service.badge}
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-full p-2">
                      {getServiceIcon(service.type)}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{service.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-primary">
                          ${service.price}
                        </span>
                        <span className="text-sm text-muted-foreground">/day</span>
                      </div>
                      <Button>View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button size="lg" variant="outline">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
