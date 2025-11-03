import { Card, CardContent } from "@/components/ui/card";
import { Building2, Car, Users } from "lucide-react";

const categories = [
  {
    icon: Building2,
    title: "Resorts & Hotels",
    description: "Luxury accommodations for your perfect getaway",
    color: "from-primary to-primary/80"
  },
  {
    icon: Car,
    title: "Vehicles",
    description: "Premium cars and transportation solutions",
    color: "from-accent to-accent/80"
  },
  {
    icon: Users,
    title: "Conference Halls",
    description: "Professional spaces for meetings and events",
    color: "from-primary/80 to-accent/80"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What We Offer</h2>
          <p className="text-xl text-muted-foreground">
            Discover our range of premium reservation options
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary/50"
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
