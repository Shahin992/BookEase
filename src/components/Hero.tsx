import { Button } from "@/components/ui/button";
import { useAuth } from "@/Context/AuthContext";
import { ArrowRight, Search, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Book Your Perfect
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Experience
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            From luxury resorts to premium vehicles and conference halls. 
            Find and reserve what you need, when you need it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/services">
              <Button size="lg" className="text-lg px-8 shadow-lg hover:shadow-xl transition-all">
                <Search className="mr-2 h-5 w-5" />
                Browse Reservations
              </Button>
            </Link>
            
            
             {!isAuthenticated && ( 
              <Link to="/signin">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
