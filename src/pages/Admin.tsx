import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, Building2, Check, X } from "lucide-react";
import AddServiceDialog from "@/components/AddServiceDialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const stats = [
  { title: "Total Bookings", value: "156", icon: Calendar, color: "text-primary" },
  { title: "Active Customers", value: "89", icon: Users, color: "text-accent" },
  { title: "Revenue (MTD)", value: "$45,230", icon: DollarSign, color: "text-green-600" },
  { title: "Properties", value: "24", icon: Building2, color: "text-primary" }
];

const initialBookings = [
  { id: 1001, customerName: "John Smith", service: "Beach Resort Deluxe", date: "2025-11-15", status: "pending", amount: "$599" },
  { id: 1002, customerName: "Sarah Johnson", service: "Luxury SUV Rental", date: "2025-11-18", status: "pending", amount: "$299" },
  { id: 1003, customerName: "Michael Brown", service: "Conference Hall A", date: "2025-11-20", status: "pending", amount: "$899" },
  { id: 1004, customerName: "Emily Davis", service: "Mountain Villa", date: "2025-11-22", status: "confirmed", amount: "$799" },
  { id: 1005, customerName: "David Wilson", service: "Sports Car Rental", date: "2025-11-25", status: "confirmed", amount: "$499" },
];

const Admin = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const { toast } = useToast();

  const handleConfirmBooking = (id: number) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: "confirmed" } : b
    ));
    toast({
      title: "Booking Confirmed",
      description: `Booking #${id} has been confirmed successfully.`,
    });
  };

  const handleRejectBooking = (id: number) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: "rejected" } : b
    ));
    toast({
      title: "Booking Rejected",
      description: `Booking #${id} has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your reservations and bookings efficiently
            </p>
          </div>
          <AddServiceDialog />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-xl transition-all border-2 hover:border-primary/30 bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="border-2 bg-white">
          <CardHeader>
            <CardTitle>Booking Requests</CardTitle>
            <CardDescription>Manage and confirm customer bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-semibold">Booking #{booking.id}</p>
                      <Badge 
                        variant={booking.status === "confirmed" ? "default" : booking.status === "rejected" ? "destructive" : "secondary"}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{booking.customerName}</p>
                    <p className="text-sm font-medium mt-1">{booking.service}</p>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span>📅 {booking.date}</span>
                      <span>💰 {booking.amount}</span>
                    </div>
                  </div>
                  {booking.status === "pending" && (
                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => handleConfirmBooking(booking.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Confirm
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleRejectBooking(booking.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
