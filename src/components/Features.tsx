import { Shield, Clock, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your data and payments are protected with enterprise-grade security"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Book anytime, anywhere with instant confirmation"
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    description: "Multiple payment options with secure checkout process"
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Dedicated support team ready to assist you"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose BookEase</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide the best booking experience with features designed for your convenience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
