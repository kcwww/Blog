const MainSection = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="w-full bg-gray-400 dark:bg-gray-700 rounded-lg flex flex-col justify-start items-start p-8 gap-8 min-h-[35rem]">
      {children}
    </section>
  );
};

export default MainSection;
