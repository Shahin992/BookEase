import Navbar from "@/components/Navbar";
import HeroSwiper from "@/components/HeroSwiper";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import Features from "@/components/Features";
import FeaturedServices from "@/components/FeaturedServices";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSwiper />
      <Hero />
      <FeaturedCategories />
      <Features />
      <FeaturedServices />
      <Testimonials />
      
      <Footer />
    </div>
  );
};

export default Index;
