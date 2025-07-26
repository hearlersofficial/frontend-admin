import { useState } from 'react';
import dayjs from 'dayjs';
import { useQueries, useQuery } from '@tanstack/react-query';

import { Button } from '~/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Modal } from '~/components/Modal';
import Pagination from '~/components/Pagination';
import PromptModal from '../../Prompt/modals/PromptModal';

import { queries } from '~/queries';
import { usePagination } from '~/hooks/usePagination';
import { PromptVersionResponseDto } from '~/__generated__/data-contracts';

interface DeploymentHistoryModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DeploymentHistoryModal = ({ isOpen, setIsOpen }: DeploymentHistoryModalProps) => {
  const { data: activateHistories = [] } = useQuery({ ...queries.v1.getPromptActivateHistories({}), enabled: isOpen });

  const promptVersionResults = useQueries({
    queries: activateHistories.map((history) => {
      return {
        ...queries.v1.getPromptVersionById(history.promptVersionId!),
        enabled: !!history.promptVersionId,
      };
    }),
  });
  const promptVersions = promptVersionResults.map((q) => q.data).filter(Boolean) as PromptVersionResponseDto[];

  const [selectedPrompt, setSelectedPrompt] = useState<PromptVersionResponseDto | null>(null);
  const { currentPage, totalPages, displayedItems, setCurrentPage } = usePagination(promptVersions, 6);

  const handleDetailView = (prompt: PromptVersionResponseDto) => {
    setSelectedPrompt(prompt);
    // setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="4xl">
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
                <TableCell className="px-4 py-2 text-[#666]">
                  {dayjs(prompt.createdAt).format('YY.MM.DD HH:mm')}
                </TableCell>
                <TableCell className="px-4 py-2 text-[#333]">{prompt.name}</TableCell>
                <TableCell className="truncate px-4 py-2 text-[#666]">{prompt.description}</TableCell>
                <TableCell className="flex gap-2 px-4 py-2">
                  <Button
                    size="sm"
                    className="rounded-full bg-[#68676A] px-4 text-white"
                    onClick={() => handleDetailView(prompt)}
                  >
                    자세히 보기
                  </Button>
                  <Button
                    size="sm"
                    className="rounded-full bg-[#736A84] px-4 text-white"
                    onClick={() => handleDetailView(prompt)}
                  >
                    불러오기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
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

export default DeploymentHistoryModal;
