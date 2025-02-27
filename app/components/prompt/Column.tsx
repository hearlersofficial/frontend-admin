import { useDrop } from 'react-dnd';

const Column = ({ children, title }: { children: JSX.Element[]; title: string }) => {
  const [, drop] = useDrop({
    accept: 'INSTRUCTION_ITEM',
    drop: () => ({ name: title }),
  });

  return (
    <div ref={drop} className="flex h-[40rem] w-1/2 flex-col gap-2 overflow-y-auto rounded bg-gray-100 p-2">
      <h3 className="font-semibold">{title}</h3>
      {children}
    </div>
  );
};

export default Column;
