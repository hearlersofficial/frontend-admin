import dayjs from 'dayjs';
import { Star } from 'lucide-react';

import { Modal } from '~/components/Modal';
import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import Pagination from '~/components/Pagination';
import { usePagination } from '~/hooks/usePagination';

import { useState } from 'react';
import { PromptVersion } from '~/api/v1';

interface CreateCounselModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  promptVersionList: PromptVersion[];
  selectedPromptVersionId?: string;
  setSelectedPromptVersionId: (id?: string) => void;
  onCreate: () => void;
  canSubmit: boolean;
}

const CreateCounselModal = ({
  isOpen,
  setIsOpen,
  promptVersionList,
  selectedPromptVersionId,
  setSelectedPromptVersionId,
  onCreate,
  canSubmit,
}: CreateCounselModalProps) => {
  const [showFavsOnly, setShowFavsOnly] = useState(false);

  const filteredList = showFavsOnly ? promptVersionList.filter((p) => p.isBookmarked) : promptVersionList;
  const { currentPage, totalPages, displayedItems, setCurrentPage } = usePagination(filteredList, 6);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="4xl">
      <div className="space-y-3">
        <h3 className="px-1 text-base font-semibold text-slate-700">새 상담 시작</h3>

        <Table>
          <TableHeader>
            <TableRow className="text-left">
              <TableHead className="w-4 px-2"></TableHead>
              <TableHead className="w-4 px-2"></TableHead>
              <TableHead className="px-4 py-2 font-semibold text-[#B5B7C0]">프롬프트 제목</TableHead>
              <TableHead className="px-4 font-semibold text-[#B5B7C0]">시간</TableHead>
              <TableHead className="px-4 font-semibold text-[#B5B7C0]">메모</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedItems.map((pv) => {
              const isSelected = selectedPromptVersionId === pv.id;
              return (
                <TableRow
                  key={pv.id}
                  className={`cursor-pointer border-b border-[#E0E0E0] hover:bg-[#F9F9F9] ${isSelected ? 'bg-violet-50' : ''}`}
                  onClick={() => setSelectedPromptVersionId(pv.id)}
                >
                  <TableCell className="w-4 px-2">
                    <input
                      type="radio"
                      name="promptVersionSelect"
                      checked={isSelected}
                      onChange={() => setSelectedPromptVersionId(pv.id)}
                    />
                  </TableCell>
                  <TableCell className="w-4 px-2">
                    {pv.isBookmarked && <Star className="h-4 w-4 fill-current text-[#F0D467]" />}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-[#333]">{pv.name}</TableCell>
                  <TableCell className="px-4 py-2 text-[#666]">
                    {dayjs(pv.createdAt).format('YY.MM.DD HH:mm')}
                  </TableCell>
                  <TableCell className="truncate px-4 py-2 text-[#666]">{pv.description}</TableCell>
                </TableRow>
              );
            })}
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
              <Button
                onClick={() => setSelectedPromptVersionId(undefined)}
                className="rounded-full bg-[#848484] text-sm font-semibold text-white"
                size="default"
                variant="secondary"
              >
                선택 해제
              </Button>
            </div>
            <Button
              className="rounded-full bg-[#736A84] px-6 text-base font-semibold text-white"
              size="lg"
              onClick={onCreate}
              disabled={!canSubmit}
            >
              상담 시작하기
            </Button>
          </div>
        </DialogFooter>
      </div>
    </Modal>
  );
};

export default CreateCounselModal;
