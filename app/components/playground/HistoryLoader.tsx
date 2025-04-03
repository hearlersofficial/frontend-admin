import { Button } from '~/components/ui/button';

const mockHistories = [
  {
    id: 1,
    summary: '250327 톤수정ver',
  },
  {
    id: 2,
    summary: '공감추가2',
  },
  {
    id: 3,
    summary: '공감추가1',
  },
  {
    id: 4,
    summary: '250326 문장수 변경',
  },
  {
    id: 5,
    summary: '톤수정_밝게',
  },
  {
    id: 6,
    summary: '톤수정_반말',
  },
  {
    id: 7,
    summary: '250321 해결책 추가',
  },
];

const HistoryLoader = () => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <h4 className="whitespace-pre-line text-sm font-semibold text-[#68676A]">{'기록\n불러오기'}</h4>

      {mockHistories.map((item) => {
        return (
          <button
            key={item.id}
            onClick={() => {}}
            className="h-12 w-20 break-keep rounded-md border-2 border-[#A99FAA] p-1 text-center"
          >
            <div className="text-xs text-[#A99FAA]">{item.summary}</div>
          </button>
        );
      })}

      <Button className="rounded-full bg-[#736A84]" size="sm">
        더보기
      </Button>
    </div>
  );
};
export default HistoryLoader;
