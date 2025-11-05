import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { updateBookingDates } from "@/api/bookingApi";
import { toast } from "sonner";

interface EditBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  serviceName: string;
  currentCheckIn: string;
  currentCheckOut: string;
  onSave: (bookingId: string, checkIn: Date, checkOut: Date) => void;
}

export const EditBookingDialog = ({
  open,
  onOpenChange,
  bookingId,
  serviceName,
  currentCheckIn,
  currentCheckOut,
   onSave,
}: EditBookingDialogProps) => {
  const [checkIn, setCheckIn] = useState<Date>(new Date(currentCheckIn));
  const [checkOut, setCheckOut] = useState<Date>(new Date(currentCheckOut));
  const [editing, setEditing] = useState(false);


  const handleSaveEdit = async (
  bookingId: string,
  checkIn: Date,
  checkOut: Date
) => {
  setEditing(true);
  try {
    // 🔹 1. Call backend API (which already validates conflicts)
    const response = await updateBookingDates({
      bookingId,
      checkInDate: checkIn.toISOString(),
      checkOutDate: checkOut.toISOString(),
    });

    // 🔹 2. Handle response
    if (response.success) {
      onSave(bookingId, checkIn, checkOut);

      toast.success("Booking updated successfully!");
      onOpenChange(false);
    } else {
      toast.error(response.message || "Failed to update booking");
    }
  } catch (error: any) {
    const msg =
      error.response?.data?.message || error.message || "Something went wrong";
    toast.error(msg);
  } finally {
    setEditing(false);
  }
};

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
          <DialogDescription>
            Update your booking dates for {serviceName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Check-In Date</label>
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
                  onSelect={(date) => date && setCheckIn(date)}
                  disabled={(date) => date < today}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Check-Out Date</label>
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
                  onSelect={(date) => date && setCheckOut(date)}
                  disabled={(date) => date < checkIn}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={editing} onClick={()=>handleSaveEdit(bookingId, checkIn, checkOut)}>
            {editing ? "Savaing..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
