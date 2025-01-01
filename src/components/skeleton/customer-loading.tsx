/** @format */

import { Skeleton } from "../ui/skeleton";

export default function CustomerLoadingSkeleton() {
  return (
    <div>
      <Skeleton className="w-full h-[100%]">
        <div className="p-4 space-y-2">
          <Skeleton className=" w-[15%] h-6" />
          <Skeleton className=" w-full h-6" />
          <div className="space-y-4">
            <CustomerListSkeleton />
            <CustomerListSkeleton />
            <CustomerListSkeleton />
            <CustomerListSkeleton />
            <CustomerListSkeleton />
            <CustomerListSkeleton />
            <CustomerListSkeleton />
          </div>
        </div>
      </Skeleton>
    </div>
  );
}

function CustomerListSkeleton() {
  return (
    <div className="flex gap-2">
      <Skeleton className=" w-[50%] h-8" />
      <Skeleton className=" w-full h-8" />
      <Skeleton className=" w-full h-8" />
      <Skeleton className=" w-full h-8" />
      <Skeleton className=" w-full h-8" />
      <Skeleton className=" w-[50%] h-8" />
    </div>
  );
}
