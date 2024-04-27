import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <>
      <div className="h-[2rem]" />
      <div className="grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 2xl:gap-12 w-full">
        <Skeleton className="h-[22rem] rounded-xl" />
        <Skeleton className="h-[22rem] rounded-xl" />
        <Skeleton className="h-[22rem] rounded-xl" />
        <Skeleton className="h-[22rem] rounded-xl" />
      </div>
    </>
  );
};

export default SkeletonCard;
