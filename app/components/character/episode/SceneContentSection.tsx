import { useMemo, useRef } from 'react';
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { useEpisodeDetailStore } from "~/stores/episodeDetailStore";
import { useEpisodeImageStore } from "~/stores/episodeImageStore";
import { useCounselor } from "~/hooks/queries/useCounselor";
import { useImageUpload } from "./hooks";

interface SceneContentSectionProps {
  counselorId: string;
}

const SceneContentSection = ({ counselorId }: SceneContentSectionProps) => {
  const isEditing = useEpisodeDetailStore(state => state.isEditing);
  const scenes = useEpisodeDetailStore(state => state.editData.scenes);
  const currentEpisode = useEpisodeDetailStore(state => state.currentEpisode);
  const updateSceneData = useEpisodeDetailStore(state => state.updateSceneData);
  const updateSceneImage = useEpisodeDetailStore(state => state.updateSceneImage);
  
  const selectedImageIndex = useEpisodeImageStore(state => state.selectedImageIndex);
  const navigateImage = useEpisodeImageStore(state => state.navigateImage);

  // 파일 선택을 위한 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // counselor 정보 가져오기
  const { data: counselor } = useCounselor(counselorId, !!counselorId);

  // 이미지 업로드 훅
  const { uploadImage, isUploading } = useImageUpload(
    currentEpisode?.id || '',
    counselorId,
    (imageUrl: string) => {
      // 업로드 성공 시 현재 씬에 이미지 URL 설정
      updateSceneImage(adjustedSelectedIndex, imageUrl);
    }
  );

  // useMemo로 메모이제이션하여 무한 렌더링 방지
  const { adjustedSelectedIndex, currentScene, speakerOptions } = useMemo(() => {
    const selectedIndex = Math.min(selectedImageIndex, scenes.length - 1);
    const scene = scenes[selectedIndex] || { 
      id: 'fallback_scene', 
      speaker: '지문', 
      dialogue: '',
      image: ''
    };
    const options = [
      { value: counselor?.data?.name ?? 'counselor', label: counselor?.data?.name ?? '상담사' },
      { value: '유저', label: '유저' },
      { value: '지문', label: '지문' },
    ];
    
    return {
      adjustedSelectedIndex: selectedIndex,
      currentScene: scene,
      speakerOptions: options
    };
  }, [selectedImageIndex, scenes, counselor?.data?.name]);

  const onSpeakerChange = (speaker: string) => {
    updateSceneData(adjustedSelectedIndex, { speaker });
  };

  const onDialogueChange = (dialogue: string) => {
    updateSceneData(adjustedSelectedIndex, { dialogue });
  };

  // 파일 선택 핸들러
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // PC에서 추가 버튼 클릭 핸들러
  const handlePCUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-start gap-6 mb-6">
      {/* Left navigation */}
      <Button 
        variant="outline" 
        size="sm" 
        className="px-3 py-6 mt-32" 
        onClick={() => navigateImage('prev', scenes.length)}
      >
        {'<<'}
      </Button>

      {/* Center - Image */}
      <div className="w-56 h-80 rounded-lg bg-gray-300 flex items-center justify-center overflow-hidden">
        {currentScene.image ? (
          <img 
            src={currentScene.image} 
            alt={`Scene ${adjustedSelectedIndex + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-500 text-lg">Scene {adjustedSelectedIndex + 1}</span>
        )}
      </div>

      {/* Right side - Speaker, Dialogue and Management buttons */}
      <div className="flex-1 space-y-4">
        <div>
          <div className="font-medium mb-2">화자</div>
          <Select 
            value={currentScene.speaker} 
            disabled={!isEditing}
            onValueChange={onSpeakerChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="화자 선택" />
            </SelectTrigger>
            <SelectContent>
              {speakerOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="font-medium mb-2">대사</div>
          <Textarea 
            rows={8} 
            value={currentScene.dialogue}
            readOnly={!isEditing}
            className={`w-full ${!isEditing ? "bg-gray-50" : ""}`}
            placeholder="대사를 입력하세요..."
            onChange={(e) => onDialogueChange(e.target.value)}
          />
        </div>
        
        {/* Management buttons */}
        {isEditing && (
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" className="bg-red-100 text-red-600 hover:bg-red-200">
              페이지 삭제
            </Button>
            <Button variant="outline">
              기존 이미지
            </Button>
            <Button 
              variant="outline" 
              onClick={handlePCUpload}
              disabled={isUploading}
            >
              {isUploading ? '업로드 중...' : 'PC에서 추가'}
            </Button>
          </div>
        )}
        
        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {/* Right navigation */}
      <Button 
        variant="outline" 
        size="sm" 
        className="px-3 py-6 mt-32" 
        onClick={() => navigateImage('next', scenes.length)}
      >
        {'>>'}
      </Button>
    </div>
  );
};

export default SceneContentSection; 