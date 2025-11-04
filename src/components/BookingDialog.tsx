import { useState } from "react";
import CustomAlert from "@/components/CustomAlert";
import { format } from "date-fns";
import { CalendarIcon, CreditCard, Check, MapPin, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { CreateBookingRequest, Reservation } from "@/data/mockReservations";
import { createBooking } from "@/api/bookingApi";
import { useAuth } from "@/Context/AuthContext";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation;
}

const BookingDialog = ({ open, onOpenChange, reservation }: BookingDialogProps) => {
  const { user,  } = useAuth();
  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState<number>(1);
  const [preferences, setPreferences] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardError, setCardError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Stripe test card numbers
  const validTestCards = [
    "4242424242424242", // Visa
    "4000056655665556", // Visa (debit)
    "5555555555554444", // Mastercard
    "2223003122003222", // Mastercard (2-series)
    "5200828282828210", // Mastercard (debit)
    "378282246310005",  // American Express
    "371449635398431",  // American Express
    "6011111111111117", // Discover
    "6011000990139424", // Discover
    "3056930009020004", // Diners Club
    "36227206271667",   // Diners Club (14-digit)
    "3566002020360505", // JCB
  ];

  const validateCardNumber = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "");
    if (!validTestCards.includes(cleanNumber)) {
      setCardError("Please use a valid Stripe test card number");
      return false;
    }
    setCardError("");
    return true;
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(" ") : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const validateExpiry = (value: string) => {
    const [month, year] = value.split("/");
    if (!month || !year) return false;
    
    const monthNum = parseInt(month);
    const yearNum = parseInt("20" + year);
    
    if (monthNum < 1 || monthNum > 12) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    if (yearNum < currentYear) return false;
    if (yearNum === currentYear && monthNum < currentMonth) return false;
    
    return true;
  };

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return reservation.price;
    const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return days * reservation.price;
  };

  const handlePayment = () => {
    setShowSuccessAlert(true);
  };

  const handleSuccessConfirm = () => {
    onOpenChange(false);
    // Reset form
    setStep(1);
    setCheckIn(undefined);
    setCheckOut(undefined);
    setGuests(1);
    setPreferences("");
    setCardNumber("");
    setCardName("");
    setExpiry("");
    setCvv("");
  };

  const handleBooking = async () => {
  if (!checkIn || !checkOut) return;

  try {
    const payload: CreateBookingRequest = {
      serviceId: reservation?._id.toString(),
      checkInDate: checkIn.toISOString(),
      checkOutDate: checkOut.toISOString(),
      totalGuests: guests,
      _id: user._id
    };

    const response = await createBooking(payload);

    if (response.success) {
      console.log('res===>',response.data)
      toast.success("Booking confirmed!");
      setShowSuccessAlert(true);
    } else {
      toast.error(response.message || "Booking failed");
    }
  } catch (error: any) {
    const msg = error.response?.data?.message || error.message || "Something went wrong";
    toast.error(msg);
  }
};

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {step === 1 ? "Customize Your Booking" : "Payment Details"}
            </DialogTitle>
            <DialogDescription>
              {step === 1 
                ? `Complete your reservation for ${reservation.title}`
                : "Securely complete your payment"
              }
            </DialogDescription>
          </DialogHeader>

          {step === 1 ? (
            <div className="space-y-6">
              {/* Date Selection */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Check-in Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkIn && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? format(checkIn, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Check-out Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkOut && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? format(checkOut, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) => date < (checkIn || new Date())}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                />
              </div>

              {/* Preferences */}
              {/* <div className="space-y-2">
                <Label htmlFor="preferences">Special Preferences (Optional)</Label>
                <Textarea
                  id="preferences"
                  placeholder="Add any special requests or preferences..."
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  rows={4}
                />
              </div> */}

              <Separator />

              {/* Pricing Summary */}
              <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price per day</span>
                  <span className="font-medium">${reservation.price}</span>
                </div>
                {checkIn && checkOut && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} days
                    </span>
                    <span className="font-medium">
                      ${calculateTotal()}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${calculateTotal()}</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleBooking}
                disabled={!checkIn || !checkOut}
              >
                Continue to Payment
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background border border-primary/20 p-6 rounded-2xl shadow-lg">
                <div className="relative z-10 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {reservation.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {reservation.location}
                      </p>
                    </div>
                  </div>
                  
                  {checkIn && checkOut && (
                    <div className="flex items-center gap-2 text-sm bg-background/60 backdrop-blur-sm px-3 py-2 rounded-lg w-fit">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span>{format(checkIn, "MMM dd")} - {format(checkOut, "MMM dd, yyyy")}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm bg-background/60 backdrop-blur-sm px-3 py-2 rounded-lg w-fit">
                    <span className="font-medium">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      ${calculateTotal()}
                    </span>
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -z-0" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-2xl -z-0" />
              </div>

              {/* Payment Form */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Payment Information</h3>
                    <p className="text-xs text-muted-foreground">All transactions are secure and encrypted</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName" className="text-sm font-semibold">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="Test User (Stripe Test)"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="h-12 rounded-xl border-2 focus:border-primary transition-colors"
                  />
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary" />
                    Use any test name for Stripe test mode
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-sm font-semibold">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        setCardNumber(formatted);
                      }}
                      onBlur={(e) => validateCardNumber(e.target.value)}
                      maxLength={19}
                      className={cn(
                        "h-12 rounded-xl border-2 pl-4 pr-12 font-mono tracking-wider transition-colors",
                        cardError ? "border-destructive focus:border-destructive" : "focus:border-primary"
                      )}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  {cardError && (
                    <p className="text-xs text-destructive font-medium flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                      {cardError}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary" />
                    Test cards: 4242 4242 4242 4242 (Visa), 5555 5555 5555 4444 (Mastercard)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-sm font-semibold">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => {
                        const formatted = formatExpiry(e.target.value);
                        setExpiry(formatted);
                      }}
                      maxLength={5}
                      className="h-12 rounded-xl border-2 focus:border-primary transition-colors font-mono"
                    />
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary" />
                      Any future date
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-sm font-semibold">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 3) {
                          setCvv(value);
                        }
                      }}
                      maxLength={3}
                      className="h-12 rounded-xl border-2 focus:border-primary transition-colors font-mono"
                    />
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-primary" />
                      Any 3 digits
                    </p>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-background pt-4 pb-2 -mx-6 px-6 border-t mt-6">
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 h-12 rounded-xl"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 h-12 rounded-xl"
                    onClick={handlePayment}
                    disabled={
                      !cardName || 
                      !cardNumber || 
                      !expiry || 
                      cvv.length !== 3 || 
                      !!cardError ||
                      !validateExpiry(expiry)
                    }
                  >
                    <Check className="mr-2 h-5 w-5" />
                    Confirm & Pay ${calculateTotal()}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <CustomAlert
        open={showSuccessAlert}
        onOpenChange={setShowSuccessAlert}
        icon={CheckCircle2}
        title="Booking Confirmed!"
        message={`Your reservation for ${reservation.title} has been successfully confirmed. We've sent a confirmation email with all the details.`}
        buttonText="Done"
        onSubmit={handleSuccessConfirm}
      />
    </>
  );
};

export default BookingDialog;
