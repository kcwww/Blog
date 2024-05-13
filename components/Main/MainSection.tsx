const MainSection = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="w-full dark:bg-gray-900 rounded-lg flex flex-col justify-start items-start p-8 gap-8 min-h-[35rem] shadow-main dark:shadow-darkMain">
      {children}
    </section>
  );
};

export default MainSection;
