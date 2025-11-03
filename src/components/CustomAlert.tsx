import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LucideIcon } from "lucide-react";

interface CustomAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon: LucideIcon;
  title: string;
  message: string;
  buttonText?: string;
  onSubmit?: () => void;
}

const CustomAlert = ({
  open,
  onOpenChange,
  icon: Icon,
  title,
  message,
  buttonText = "Continue",
  onSubmit,
}: CustomAlertProps) => {
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex flex-col items-center gap-4 pb-2">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <AlertDialogTitle className="text-2xl text-center">
              {title}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-center text-base pt-2">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center pt-4">
          <AlertDialogAction
            onClick={handleSubmit}
            className="w-full sm:w-auto px-8 h-12 rounded-xl"
          >
            {buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlert;
