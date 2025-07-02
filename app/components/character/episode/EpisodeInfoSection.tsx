import { Button } from "~/components/ui/button";
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
  onOrderAdjustment: () => void;
  isOrderAdjustmentMode?: boolean;
}

const EpisodeInfoSection = ({
  episode,
  isEditing,
  status,
  onTitleChange,
  onLevelChange,
  onStatusChange,
  onOrderAdjustment,
  isOrderAdjustmentMode = false,
}: EpisodeInfoSectionProps) => {
  if (!episode) return null;

  return (
    <div className="flex flex-row gap-4 mb-6 items-end">
      <div className="w-full">
        <div className="font-medium mb-1">에피소드 제목</div>
        <Input 
          value={episode.title || ''} 
          readOnly={!isEditing} 
          className={!isEditing ? "bg-gray-50" : ""}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>
      <div className="w-full">
        <div className="font-medium mb-1">기준 레벨</div>
        <Select 
          defaultValue={episode.level.toString()} 
          disabled={!isEditing}
          onValueChange={(value) => onLevelChange(parseInt(value))}
        >
          <SelectTrigger className="w-full h-9">
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
      <div className="w-full">
        <div className="font-medium mb-1">배포 상태</div>
        <Select 
          value={status}
          disabled={!isEditing}
          onValueChange={onStatusChange}
        >
          <SelectTrigger 
            className={`w-full h-9 ${status === '배포' ? 'text-white' : ''}`}
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
      <div className="flex items-end h-full">
        <Button
          variant="outline"
          size="sm"
          onClick={onOrderAdjustment}
          className="w-full"
          disabled={!isEditing}
        >
          {isOrderAdjustmentMode ? "완료" : "순서 조정"}
        </Button>
      </div>
    </div>
  );
};

export default EpisodeInfoSection; 