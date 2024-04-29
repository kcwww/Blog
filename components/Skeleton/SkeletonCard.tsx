import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <>
      <Skeleton className="h-[22rem] rounded-xl" />
      <Skeleton className="h-[22rem] rounded-xl" />
      <Skeleton className="h-[22rem] rounded-xl" />
      <Skeleton className="h-[22rem] rounded-xl" />
    </>
  );
};

export default SkeletonCard;
