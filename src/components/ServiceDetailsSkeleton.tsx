import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const ServiceDetailsSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Image Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-[400px] lg:h-[500px] w-full rounded-xl" />
      </div>

      {/* Details Section Skeleton */}
      <div className="space-y-6">
        {/* Title and Location */}
        <div>
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <Skeleton className="h-10 w-1/3 mb-6" />
          <Skeleton className="h-6 w-1/4 mb-6" />
        </div>

        {/* About Section */}
        <div className="border-t pt-6">
          <Skeleton className="h-8 w-1/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Features Section */}
        <div className="border-t pt-6">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-full" />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-4">
                <Skeleton className="h-6 w-6 mx-auto mb-2" />
                <Skeleton className="h-4 w-full" />
              </Card>
            ))}
          </div>
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsSkeleton;