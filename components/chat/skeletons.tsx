import { Skeleton } from "@/components/ui/skeleton";
import { ThreeDots } from "react-loader-spinner";

export const SmoothLoader = () => (
  <div className="flex items-center justify-center">
    <div className="mr-2 w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
  </div>
);

export function WoodnotesImageProcessingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Skeleton className="h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-lg bg-gray-200" />
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-4 rounded-full bg-gray-300" />
        <Skeleton className="h-4 w-32 bg-gray-300" />
      </div>
      <div className="flex items-center justify-center">
        <span className="text-lg font-medium text-gray-600 mr-2">
          Processing image
        </span>
        <ThreeDots height="24" width="24" color="#4B5563" />
      </div>
    </div>
  );
}

export function CameraSkeleton() {
  return (
    <div>
      <div className="flex flex-col space-y-8">
        <Skeleton className="h-72 min-w-[350px] sm:h-72 md:h-80 md:w-[520px] lg:h-96 lg:w-[620px] rounded-xl bg-gray-300 shadow-md" />
        <div className="flex space-x-4 justify-center">
          <Skeleton className="h-8 w-32 sm:w-32 md:w-40 lg:w-48 bg-slate-700" />
          <Skeleton className="h-8 w-28 sm:w-28 md:w-36 lg:w-44 bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-80 w-[339px] sm:min-w-[375px] rounded-xl bg-gray-300 shadow-md" />
        <div className="item-c">
          <span className="text-2xl font-semibold text-center flex items-center justify-center gap-3">
            Identifying Rug Type
            <ThreeDots height="56" width="56" color="" />
          </span>
        </div>
      </div>
    </div>
  );
}
