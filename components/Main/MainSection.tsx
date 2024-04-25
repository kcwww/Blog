const MainSection = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="w-full md:min-w-[25rem] bg-gray-400 dark:bg-gray-700 rounded-lg flex flex-col justify-start items-start p-4 gap-8">
      {children}
    </section>
  );
};

export default MainSection;
