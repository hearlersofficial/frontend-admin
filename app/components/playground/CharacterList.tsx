type Character = {
  id: string;
  name: string;
  description: string;
};
interface CharacterListProps {
  characters: Character[];
  selected: string;
  onSelect: (id: string) => void;
}

const CharacterList = ({ characters, selected, onSelect }: CharacterListProps) => {
  return (
    <div className="space-y-1">
      {characters.map(({ id, name, description }) => {
        const isSelected = id === selected;

        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex w-full flex-col items-center gap-3 rounded-l-xl p-3 ${
              isSelected ? 'bg-white' : 'bg-transparent'
            }`}
          >
            <div className="bg-purpleGrad h-16 w-16 rounded-full" />
            {isSelected && (
              <div className="flex flex-col items-center justify-center">
                <span className="text-base font-bold text-[#878787]">{name}</span>
                <span className="rounded-lg bg-[#A2BBFE] px-2 py-0.5 text-xs text-white">#{description}</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
export default CharacterList;
