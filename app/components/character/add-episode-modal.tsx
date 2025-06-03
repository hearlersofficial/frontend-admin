import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Label } from "~/components/ui/label";

interface AddEpisodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddEpisodeModal({ isOpen, onClose }: AddEpisodeModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>에피소드 추가</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              에피소드 제목
            </Label>
            <Input id="title" placeholder="제목을 입력하세요..." className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="level" className="text-right">
              기존 레벨
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="레벨 선택" />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5].map(level => (
                    <SelectItem key={level} value={String(level)}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">취소</Button>
          </DialogClose>
          <Button type="submit">에피소드 추가</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 