import Navbar from "@/components/Navbar";
import HeroSwiper from "@/components/HeroSwiper";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import Features from "@/components/Features";
import FeaturedServices from "@/components/FeaturedServices";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { IApiResponse, Reservation } from "@/data/mockReservations";
import { getAllServices } from "@/api/servicesApi";

const Index = () => {
  const [services, setServices] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchServices = async () => {
        try {
          setLoading(true);
          const response: IApiResponse<Reservation[]> = await getAllServices();
          if (response?.success) {
            setServices(response?.data ?? []);
            
          } else {
            setError(response?.message || 'Failed to load services');
          }
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchServices();
    }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSwiper />
      <Hero />
      <FeaturedCategories />
      <Features />
     {services && (<FeaturedServices services={services}/>)}
      <Testimonials />
      
      <Footer />
    </div>
  );
};

export default Index;
