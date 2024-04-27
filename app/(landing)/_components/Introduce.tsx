const Introduce = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="animate-text-down opacity-0 text-2xl">
        Front-End Developer
      </h1>
      <div className="flex flex-col gap-1">
        <p className="animate-text-down-delay opacity-0">
          안녕하세요, 사람들의 삶에 가치를 더하는 경험을 제공하고자 하는 FE
          개발자 김찬우입니다.
        </p>
        <p className="animate-text-down-delay  opacity-0">
          사용자 중심의 디자인과 기술 구현을 통해 접근성이 높고, 직관적인 웹
          경험을 만들어 나가고자 합니다.
        </p>
      </div>
    </div>
  );
};

export default Introduce;
