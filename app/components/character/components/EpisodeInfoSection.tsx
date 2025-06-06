import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Episode } from "../types/Episode";

interface EpisodeInfoSectionProps {
  episode: Episode | null;
  isEditing: boolean;
  status: string;
  onTitleChange: (title: string) => void;
  onLevelChange: (level: number) => void;
  onStatusChange: (status: string) => void;
}

const EpisodeInfoSection = ({
  episode,
  isEditing,
  status,
  onTitleChange,
  onLevelChange,
  onStatusChange,
}: EpisodeInfoSectionProps) => {
  if (!episode) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <div className="font-medium mb-1">에피소드 제목</div>
        <Input 
          value={episode.title || ''} 
          readOnly={!isEditing} 
          className={!isEditing ? "bg-gray-50" : ""}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>
      <div>
        <div className="font-medium mb-1">기준 레벨</div>
        <Select 
          defaultValue={episode.level.toString()} 
          disabled={!isEditing}
          onValueChange={(value) => onLevelChange(parseInt(value))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="기준 레벨" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="font-medium mb-1">배포 상태</div>
        <Select 
          value={status}
          disabled={!isEditing}
          onValueChange={onStatusChange}
        >
          <SelectTrigger 
            className={`w-full ${status === '배포' ? 'text-white' : ''}`}
            style={status === '배포' ? { backgroundColor: '#EC5E5E' } : {}}
          >
            <SelectValue placeholder="배포 상태" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="배포">배포</SelectItem>
            <SelectItem value="임시">임시</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EpisodeInfoSection; 