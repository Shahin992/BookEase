import { toast } from "@/hooks/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

type ToastType = "success" | "error";

export const showToast = (type: ToastType, message: string) => {
  const config = {
    success: {
      icon: CheckCircle,
      className: "border-green-500 bg-green-50 dark:bg-green-950",
      iconClassName: "text-green-600 dark:text-green-400",
      textClassName: "text-green-900 dark:text-green-100",
    },
    error: {
      icon: XCircle,
      className: "border-red-500 bg-red-50 dark:bg-red-950",
      iconClassName: "text-red-600 dark:text-red-400",
      textClassName: "text-red-900 dark:text-red-100",
    },
  };

  const { icon: Icon, className, iconClassName, textClassName } = config[type];

  toast({
    description: (
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${iconClassName}`} />
        <span className={textClassName}>{message}</span>
      </div>
    ),
    className,
  });
};