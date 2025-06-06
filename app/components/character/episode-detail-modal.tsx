import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";

interface Episode {
  id: string;
  title: string;
  level: number;
  createdAt: string;
  status: string;
  imageUrl: string;
}

interface EpisodeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  episode: Episode | null;
  characterName?: string;
}

// Dummy data for images - replace with actual data
const dummyImages = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  src: `/images/placeholder-thumbnail.png`,
  alt: `Thumbnail ${i + 1}`,
}));

const EpisodeDetailModal = ({ isOpen, onClose, episode, characterName }: EpisodeDetailModalProps) => {
  if (!episode) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">

        <div className="p-4">
          {/* Character and Episode Info Row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {characterName && (
                <div className="flex items-center space-x-2">
                  <div
                    className="w-12 h-12 rounded-full bg-gray-200" 
                  />
                  <span className="font-medium">{characterName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Episode Title, Level, Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <div className="font-medium mb-1">에피소드 제목</div>
              <Input value={episode.title} readOnly className="bg-gray-50" />
            </div>
            <div>
              <div className="font-medium mb-1">기준 레벨</div>
              <Select defaultValue={episode.level.toString()} disabled>
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
              <Select defaultValue={episode.status} disabled>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="배포 상태" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="배포">배포</SelectItem>
                  <SelectItem value="임시">임시</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image Thumbnails */}
          <div className="mb-6">
            <div className="font-medium mb-2">컷씬 이미지</div>
            <div className="flex items-center space-x-2 overflow-x-auto p-2 bg-gray-100 rounded">
              {dummyImages.map((img) => (
                <div key={img.id} className="flex-shrink-0 w-16 h-12 border-2 border-transparent hover:border-blue-500 cursor-pointer rounded overflow-hidden relative">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs px-1 rounded-br">
                    {img.id}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Navigation and Main Image */}
            <div className="lg:col-span-2 flex items-center space-x-4">
              <Button variant="outline" size="sm" className="px-2">
                {'<<'}
              </Button>
              <div className="flex-grow">
                <img 
                  src="/images/placeholder-large.png" 
                  alt="Selected scene" 
                  className="w-full h-auto rounded-lg shadow-md" 
                />
              </div>
              <Button variant="outline" size="sm" className="px-2">
                {'>>'}
              </Button>
            </div>

            {/* Speaker and Dialogue */}
            <div className="space-y-4">
              <div>
                <div className="font-medium mb-1">화자</div>
                <Select defaultValue="jihoo" disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="화자 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dahye">다혜</SelectItem>
                    <SelectItem value="rian">리안</SelectItem>
                    <SelectItem value="jerry">제리</SelectItem>
                    <SelectItem value="yoon">윤</SelectItem>
                    <SelectItem value="jihoo">지훈</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="font-medium mb-1">대사</div>
                <Textarea 
                  rows={6} 
                  defaultValue="방 안은 지저분하고 말끔하다.&#10;가지런히 정돈되어있는 전문 서적들과 벽에 걸려 있는 각종 수료증서가 신뢰감을 더해주는 느낌이다."
                  readOnly
                  className="bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button size="lg" className="px-8">
              수정
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EpisodeDetailModal; 