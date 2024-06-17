import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/16/solid";

export default function Index() {
  return (
    <div className="min-h-[100vh] h-full bg-primary-30 flex flex-col items-center py-[80px]">
      <div className="flex flex-col items-center gap-[100px]">
        <div className="flex flex-col items-center gap-[40px]">
          <h1 className="text-[40px] font-bold text-primary-100">M I T T Y</h1>
          <h2 className="text-[20px] font-semibold">
            우리의 상상은 현실이 된다
          </h2>
        </div>
        <div className="relative w-[100px] h-[100px]">
          <ChatBubbleOvalLeftEllipsisIcon color="#73d898" />
        </div>
        <p className="font-semibold">우리는 상상의 시대에 살고있어요</p>
        <p className="font-semibold">AI와 대화하기</p>
        <p className="font-semibold">내 얼굴로 캐릭터 만들기</p>
        <p className="font-semibold">나만의 AI 커스텀까지..</p>
        <p className="font-semibold">
          이 모든것을 한번에 모아놓은{" "}
          <span className="text-primary-100">M I T T Y !</span>
        </p>
        <p className="font-semibold">여러분의 상상을 그려보세요! 🎨</p>
        <button className="text-primary-30 px-[40px] py-[12px] rounded-full bg-primary-100">
          시작하기
        </button>
      </div>
    </div>
  );
}
