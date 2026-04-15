
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <div  className="flex flex-col items-center space-y-3">
      <Skeleton className="h-96 w-96 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-4 w-80" />
      </div>
    </div>
  );
}

export default SkeletonCard;
