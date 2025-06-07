import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

interface SceneContentSectionProps {
  isEditing: boolean;
  speaker: string;
  dialogue: string;
  onSpeakerChange: (speaker: string) => void;
  onDialogueChange: (dialogue: string) => void;
}

const SceneContentSection = ({
  isEditing,
  speaker,
  dialogue,
  onSpeakerChange,
  onDialogueChange,
}: SceneContentSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Navigation and Main Image */}
      <div className="lg:col-span-2 flex items-center space-x-4">
        <Button variant="outline" size="sm" className="px-2" disabled={!isEditing}>
          {'<<'}
        </Button>
        <div className="flex-grow">
          <img 
            src="/images/placeholder-large.png" 
            alt="Selected scene" 
            className="w-full h-auto rounded-lg shadow-md" 
          />
        </div>
        <Button variant="outline" size="sm" className="px-2" disabled={!isEditing}>
          {'>>'}
        </Button>
      </div>

      {/* Speaker and Dialogue */}
      <div className="space-y-4">
        <div>
          <div className="font-medium mb-1">화자</div>
          <Select 
            value={speaker} 
            disabled={!isEditing}
            onValueChange={onSpeakerChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="화자 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dahye">다혜</SelectItem>
              <SelectItem value="rian">리안</SelectItem>
              <SelectItem value="jerry">제리</SelectItem>
              <SelectItem value="yoon">윤</SelectItem>
              <SelectItem value="jihoo">지문</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="font-medium mb-1">대사</div>
          <Textarea 
            rows={6} 
            value={dialogue}
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
            onChange={(e) => onDialogueChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SceneContentSection; 