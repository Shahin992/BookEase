import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Business Traveler",
    content: "BookEase made finding the perfect conference hall so easy! The booking process was seamless and the venue exceeded our expectations.",
    rating: 5,
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Vacation Planner",
    content: "Amazing experience! Booked a luxury resort for our family vacation. The whole process was smooth and the customer service was excellent.",
    rating: 5,
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Event Coordinator",
    content: "I've used BookEase for multiple events. The variety of options and competitive pricing keeps me coming back. Highly recommended!",
    rating: 5,
    avatar: "ER"
  },
  {
    name: "David Thompson",
    role: "Corporate Client",
    content: "Excellent platform for booking conference halls. The search filters are intuitive and the customer support team is always helpful.",
    rating: 5,
    avatar: "DT"
  },
  {
    name: "Lisa Anderson",
    role: "Wedding Planner",
    content: "Found the perfect resort for my client's destination wedding. The detailed listings and photos helped make the right choice.",
    rating: 5,
    avatar: "LA"
  },
  {
    name: "James Wilson",
    role: "Travel Enthusiast",
    content: "Great selection of vehicles for rent! Booked a luxury car for a special occasion and everything went perfectly.",
    rating: 5,
    avatar: "JW"
  },
  {
    name: "Maria Garcia",
    role: "HR Manager",
    content: "We use BookEase regularly for our corporate retreats. The platform is reliable and the booking confirmations are instant.",
    rating: 5,
    avatar: "MG"
  },
  {
    name: "Robert Kim",
    role: "Entrepreneur",
    content: "As a startup founder, I appreciate the transparent pricing and no hidden fees. BookEase has become my go-to platform.",
    rating: 5,
    avatar: "RK"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.ceil(testimonials.length / itemsPerPage) - 1;

  const next = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust BookEase
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={previous}
              className="rounded-full hover:scale-110 transition-transform"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full hover:scale-110 transition-transform"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
