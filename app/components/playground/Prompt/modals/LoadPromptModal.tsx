import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '~/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import Pagination from '~/components/Pagination';
import PromptModal from './PromptModal';

import { usePagination } from '~/hooks/usePagination';
import { Prompt } from '~/types/prompt';
import { Star } from 'lucide-react';

interface LoadPromptModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  prompts: Prompt[];
}

const LoadPromptModal = ({ isOpen, setIsOpen, prompts }: LoadPromptModalProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showFavsOnly, setShowFavsOnly] = useState(false);

  const filteredPrompts = showFavsOnly ? prompts.filter((p) => p.fav) : prompts;

  const { currentPage, totalPages, displayedItems, setCurrentPage } = usePagination(filteredPrompts, 6);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <Table>
            <TableHeader>
              <TableRow className="text-left">
                <TableHead className="w-4 px-2"></TableHead>
                <TableHead className="px-4 py-2 font-semibold text-[#B5B7C0]">프롬프트 제목</TableHead>
                <TableHead className="px-4 font-semibold text-[#B5B7C0]">시간</TableHead>
                <TableHead className="px-4 font-semibold text-[#B5B7C0]">메모</TableHead>
                <TableHead className="px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedItems.map((prompt) => (
                <TableRow key={prompt.id} className="border-b border-[#E0E0E0] hover:bg-[#F9F9F9]">
                  <TableCell className="w-4 px-2">
                    {prompt.fav && <Star className="h-4 w-4 fill-current text-[#F0D467]" />}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-[#333]">{prompt.title}</TableCell>
                  <TableCell className="px-4 py-2 text-[#666]">{prompt.time}</TableCell>
                  <TableCell className="truncate px-4 py-2 text-[#666]">{prompt.memo}</TableCell>
                  <TableCell className="px-4 py-2 text-right">
                    <Button
                      size="sm"
                      className="rounded-full bg-[#736A84] px-4 text-white"
                      onClick={() => {
                        setIsOpen(false);
                        setSelectedPrompt(prompt);
                      }}
                    >
                      자세히 보기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

          <DialogFooter>
            <div className="flex w-full items-center justify-between">
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setShowFavsOnly((prev) => !prev);
                  }}
                  className="flex items-center rounded-full border-2 border-[#848484] bg-white text-sm font-semibold text-[#848484]"
                  size="default"
                >
                  <Star className="fill-[#848484]" />
                  즐겨찾기만 보기
                </Button>
                <Button className="rounded-full bg-[#D39393] text-sm font-semibold" size="default">
                  기록삭제
                </Button>
              </div>
              <Button className="rounded-full bg-[#736A84] px-20 text-base font-semibold" size="lg">
                불러오기
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedPrompt && (
        <PromptModal isOpen={true} setIsOpen={(open) => !open && setSelectedPrompt(null)} prompt={selectedPrompt} />
      )}
    </>
  );
};

export default LoadPromptModal;
