import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

interface SceneContentSectionProps {
  isEditing: boolean;
  selectedImageIndex?: number;
  currentScene?: {
    speaker: string;
    dialogue: string;
  };
  onSpeakerChange: (speaker: string) => void;
  onDialogueChange: (dialogue: string) => void;
  onNavigateImage?: (direction: 'prev' | 'next') => void;
}

const SceneContentSection = ({
  isEditing,
  selectedImageIndex = 0,
  currentScene = { speaker: 'jihoo', dialogue: '' },
  onSpeakerChange,
  onDialogueChange,
  onNavigateImage,
}: SceneContentSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Navigation and Main Image */}
      <div className="lg:col-span-2 flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="px-2" 
          onClick={() => onNavigateImage?.('prev')}
        >
          {'<<'}
        </Button>
        <div className="flex-grow flex flex-col items-center">
          <div className="w-full h-80 rounded-lg bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-lg">Scene {selectedImageIndex + 1}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="px-2" 
          onClick={() => onNavigateImage?.('next')}
        >
          {'>>'}
        </Button>
      </div>

      {/* Speaker and Dialogue */}
      <div className="space-y-4">
        <div>
          <div className="font-medium mb-1">화자</div>
          <Select 
            value={currentScene.speaker} 
            disabled={!isEditing}
            onValueChange={onSpeakerChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="화자 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dahye">다혜</SelectItem>
              <SelectItem value="rian">리한</SelectItem>
              <SelectItem value="jerry">체리</SelectItem>
              <SelectItem value="yoon">윤</SelectItem>
              <SelectItem value="jihoo">지문</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="font-medium mb-1">대사</div>
          <Textarea 
            rows={6} 
            value={currentScene.dialogue}
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