import { useState } from 'react';

import { Button } from '~/components/ui/button';
import { Dialog, DialogContent } from '~/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import Pagination from '~/components/Pagination';

import { usePagination } from '~/hooks/usePagination';
import { Prompt } from '~/types/prompt';
import PromptModal from '../../Prompt/modals/PromptModal';

interface DeploymentHistoryModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  prompts: Prompt[];
}

const DeploymentHistoryModal = ({ isOpen, setIsOpen, prompts }: DeploymentHistoryModalProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const { currentPage, totalPages, displayedItems, setCurrentPage } = usePagination(prompts, 6);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <Table>
            <TableHeader>
              <TableRow className="text-left">
                <TableHead className="px-4 font-semibold text-[#B5B7C0]">배포시각</TableHead>
                <TableHead className="px-4 py-2 font-semibold text-[#B5B7C0]">배포 프롬프트</TableHead>
                <TableHead className="px-4 font-semibold text-[#B5B7C0]">프롬프트 메모</TableHead>
                <TableHead className="px-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedItems.map((prompt) => (
                <TableRow key={prompt.id} className="border-b border-[#E0E0E0] hover:bg-[#F9F9F9]">
                  <TableCell className="px-4 py-2 text-[#666]">{prompt.time}</TableCell>
                  <TableCell className="px-4 py-2 text-[#333]">{prompt.title}</TableCell>
                  <TableCell className="truncate px-4 py-2 text-[#666]">{prompt.memo}</TableCell>
                  <TableCell className="flex gap-2 px-4 py-2">
                    <Button
                      size="sm"
                      className="rounded-full bg-[#68676A] px-4 text-white"
                      onClick={() => {
                        setIsOpen(false);
                        setSelectedPrompt(prompt);
                      }}
                    >
                      자세히 보기
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full bg-[#736A84] px-4 text-white"
                      onClick={() => {
                        setIsOpen(false);
                        setSelectedPrompt(prompt);
                      }}
                    >
                      불러오기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </DialogContent>
      </Dialog>

      {selectedPrompt && (
        <PromptModal isOpen={true} setIsOpen={(open) => !open && setSelectedPrompt(null)} prompt={selectedPrompt} />
      )}
    </>
  );
};

export default DeploymentHistoryModal;
