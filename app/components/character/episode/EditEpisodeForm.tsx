import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

// Dummy data for images - replace with actual data
const dummyImages = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  src: `/images/placeholder-thumbnail.png`, // Replace with actual thumbnail paths
  alt: `Thumbnail ${i + 1}`,
}));

const EditEpisodeForm = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Ep. 4 상담사의 하루</h2> {/* This should be dynamic */}
        <div className="flex items-center space-x-2">
            <Button variant="outline">순서 조정</Button>
            <Button variant="destructive" className="absolute top-4 right-4">X</Button> {/* Mock close button for now*/}
        </div>      
        </div>

      <div className="mb-6">
        <div className="font-medium">에피소드 제목</div>
        <Input id="episodeTitle" defaultValue="다혜의 하루" className="mt-1" />
      </div>

      <div className="mb-6">
        <div className="font-medium">컷씬 이미지</div>
        <div className="mt-2 flex items-center space-x-2 overflow-x-auto p-2 bg-gray-100 rounded">
          {dummyImages.map((img) => (
            <div key={img.id} className="flex-shrink-0 w-24 h-16 border-2 border-transparent hover:border-blue-500 cursor-pointer rounded overflow-hidden">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div> 

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
            <img src="/images/placeholder-large.png" alt="Selected scene" className="w-full h-auto rounded-lg shadow-md" /> {/* Replace with actual large image path*/}
        </div>
        <div>
            <div className="mb-4">
                <div className="font-medium">화자</div>
                <Select defaultValue="jihoo">
                    <SelectTrigger id="speaker">
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
                <div className="font-medium">대사</div>
                <Textarea 
                    id="dialogue" 
                    rows={6} 
                    defaultValue="방 안은 지저분하고 말끔하다.\n가지런히 정돈되어있는 전문 서적들과 벽에 걸려 있는 각종 수료증서가 신뢰감을 더해주는 느낌이다."
                    className="mt-1"
                />
            </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <div className="flex space-x-2">
            <Button variant="outline">페이지 삭제</Button>
            <Button variant="outline">기존 이미지</Button>
            <Button variant="outline">PC에서 추가</Button>
        </div>
        <Button size="lg">저장</Button>
      </div>
    </div>
  );
};

export default EditEpisodeForm; 