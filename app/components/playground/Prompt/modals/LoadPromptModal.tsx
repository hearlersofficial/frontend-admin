import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Modal } from '../../components/common/Modal';
import Pagination from '~/components/Pagination';
import PromptModal from './PromptModal';
import { Star } from 'lucide-react';

import { usePagination } from '~/hooks/usePagination';
import { Prompt } from '~/types/prompt';

interface LoadPromptModalProps {
  prompts: Prompt[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const LoadPromptModal = ({ prompts, isOpen, setIsOpen }: LoadPromptModalProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [showFavsOnly, setShowFavsOnly] = useState(false);

  const filteredPrompts = showFavsOnly ? prompts.filter((p) => p.fav) : prompts;
  const { currentPage, totalPages, displayedItems, setCurrentPage } = usePagination(filteredPrompts, 6);

  const handleDetailView = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    // setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="4xl">
        <Table>
          <TableHeader>
            <TableRow className="text-left">
              {isDeleteMode && <TableHead className="w-4 px-2"></TableHead>}
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
                {isDeleteMode && (
                  <TableCell className="w-4 px-2">
                    <input type="checkbox" onChange={() => {}} />
                  </TableCell>
                )}
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
                    onClick={() => handleDetailView(prompt)}
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
                onClick={() => setShowFavsOnly((prev) => !prev)}
                className="flex items-center rounded-full border-2 border-[#848484] bg-white text-sm font-semibold text-[#848484]"
                size="default"
              >
                <Star className="fill-[#848484]" />
                즐겨찾기만 보기
              </Button>
              {!isDeleteMode && (
                <Button
                  onClick={() => setIsDeleteMode((prev) => !prev)}
                  className="rounded-full bg-[#D39393] text-sm font-semibold"
                  size="default"
                >
                  기록삭제
                </Button>
              )}
            </div>
            {!isDeleteMode ? (
              <Button className="rounded-full bg-[#736A84] px-20 text-base font-semibold" size="lg">
                불러오기
              </Button>
            ) : (
              <Button
                onClick={() => setIsDeleteMode(false)}
                className="rounded-full bg-[#D39393] px-20 text-base font-semibold"
                size="lg"
              >
                삭제하기
              </Button>
            )}
          </div>
        </DialogFooter>
      </Modal>

      {selectedPrompt && (
        <PromptModal
          prompt={selectedPrompt}
          isOpen={!!selectedPrompt}
          setIsOpen={(open) => !open && setSelectedPrompt(null)}
        />
      )}
    </>
  );
};

export default LoadPromptModal;
