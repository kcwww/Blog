import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton className="h-[125px] rounded-xl" />
    </div>
  );
};

export default SkeletonCard;
