const Introduce = ({
  title,
  description,
}: {
  title: string;
  description: string[] | null;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="animate-text-down opacity-0 text-2xl font-bold">
        {title}
      </h1>
      {description && (
        <div className="flex flex-col gap-1">
          {description.map((desc, index) => (
            <p key={index} className="animate-text-down-delay opacity-0">
              {desc}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Introduce;
