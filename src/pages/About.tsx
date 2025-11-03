import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Globe, Award, Target, Eye } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide seamless booking experiences for resorts, vehicles, and conference halls, making reservations effortless and reliable for everyone."
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To be the world's most trusted platform for hospitality and event reservations, connecting people with exceptional experiences."
    },
    {
      icon: Award,
      title: "Our Values",
      description: "Excellence, integrity, and customer satisfaction drive everything we do. We're committed to delivering premium service at every touchpoint."
    }
  ];

  const stats = [
    { icon: Building2, value: "500+", label: "Partner Properties" },
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Globe, value: "25+", label: "Countries Served" },
    { icon: Award, value: "15+", label: "Years Experience" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
            About BookEase
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Your trusted partner for booking premium resorts, luxury vehicles, and professional conference halls. 
            We connect you with exceptional experiences worldwide, making every reservation simple, secure, and satisfying.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-2 hover:border-primary/50 transition-all bg-white hover:shadow-xl">
              <CardContent className="pt-6">
                <stat.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-all bg-white hover:shadow-xl">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-2 bg-white shadow-xl">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Our Story
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
              <p>
                Founded in 2010, BookEase began with a simple idea: make booking experiences as enjoyable as the 
                experiences themselves. What started as a small team passionate about hospitality has grown into a 
                global platform serving thousands of customers daily.
              </p>
              <p>
                We've partnered with premium resorts, luxury vehicle providers, and professional conference facilities 
                across 25 countries. Our commitment to excellence and customer satisfaction has made us the preferred 
                choice for both leisure and business travelers worldwide.
              </p>
              <p>
                Today, we continue to innovate, bringing cutting-edge technology to traditional booking processes while 
                maintaining the personal touch that makes every reservation special. Our dedicated team works around the 
                clock to ensure your booking experience is seamless, secure, and satisfying.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Why Choose BookEase?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Best Price Guarantee", desc: "We ensure competitive pricing across all our services" },
            { title: "24/7 Support", desc: "Round-the-clock customer service for your peace of mind" },
            { title: "Instant Confirmation", desc: "Get immediate booking confirmations via email and SMS" },
            { title: "Secure Payments", desc: "Bank-level security for all your transactions" },
            { title: "Flexible Cancellation", desc: "Easy cancellation and modification policies" },
            { title: "Verified Partners", desc: "All properties and services thoroughly vetted" }
          ].map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-all bg-white hover:shadow-lg">
              <CardContent className="pt-6 pb-6">
                <h3 className="text-lg font-bold mb-2 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
