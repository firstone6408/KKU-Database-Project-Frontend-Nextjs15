/** @format */

import { Skeleton } from "../ui/skeleton";

export default function AuthLoadingSkeleton() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-[500px] h-96" />
      </div>
    </div>
  );
}
