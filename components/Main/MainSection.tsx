const MainSection = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="w-full md:min-w-[46.5rem] bg-gray-400 dark:bg-gray-700 rounded-lg flex flex-col justify-start items-start p-8 gap-8">
      {children}
    </section>
  );
};

export default MainSection;
