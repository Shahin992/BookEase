import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomAlert from "@/components/CustomAlert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessAlert(true);
  };

  const handleSuccessConfirm = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "text-primary"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@bookease.com", "support@bookease.com"],
      color: "text-blue-600"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Booking Street, Suite 100", "New York, NY 10001, USA"],
      color: "text-accent"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"],
      color: "text-green-600"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <Navbar />
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all bg-white hover:shadow-xl text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                    <info.icon className={`h-7 w-7 ${info.color}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-slate-800">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-slate-600">{detail}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <MessageSquare className="h-7 w-7 text-primary" />
                  <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Send Us a Message
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 bg-white">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b">
                    <AccordionTrigger className="text-left font-bold text-lg text-slate-800 hover:text-primary hover:no-underline">
                      What is your cancellation policy?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pt-2">
                      Most bookings can be cancelled up to 48 hours before the reservation date for a full refund. Check specific property policies for details.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-b">
                    <AccordionTrigger className="text-left font-bold text-lg text-slate-800 hover:text-primary hover:no-underline">
                      How do I modify my booking?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pt-2">
                      Log into your account, go to 'My Bookings', and select the reservation you want to modify. You can change dates or contact support for assistance.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-b">
                    <AccordionTrigger className="text-left font-bold text-lg text-slate-800 hover:text-primary hover:no-underline">
                      Are there any hidden fees?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pt-2">
                      No hidden fees! All prices shown include applicable taxes and service charges. What you see is what you pay.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border-none">
                    <AccordionTrigger className="text-left font-bold text-lg text-slate-800 hover:text-primary hover:no-underline">
                      How quickly will I receive confirmation?
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 pt-2">
                      You'll receive instant email confirmation once your booking is complete, along with all relevant details and vouchers.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>

      <CustomAlert
        open={showSuccessAlert}
        onOpenChange={setShowSuccessAlert}
        icon={CheckCircle2}
        title="Message Sent!"
        message="Thank you for reaching out! We've received your message and our team will get back to you within 24 hours."
        buttonText="Got it"
        onSubmit={handleSuccessConfirm}
      />
    </>
  );
};

export default Contact;
