import { useState } from 'react';

import { Button } from '~/components/ui/button';
import GraphLayout from './graphs/GraphLayout';
import AddTechniqueModal from './modals/AddTechniqueModal';
import EditTechniqueModal from './modals/EditTechniqueModal';

import { useModal } from '~/hooks/useModal';
import { useTechniqueManagement } from './hooks/useTechniqueManagement';
import { CounselTechniqueResponseDto } from '~/__generated__/data-contracts';

const Technique = () => {
  const { techniques, mode, setTechniques, handleEditTechnique, handleAddAndDeleteTechnique, handleSaveTechnique } =
    useTechniqueManagement();

  const { isOpen: isAddOpen, setIsOpen: setIsAddOpen, openModal: openAddModal } = useModal(false);
  const { isOpen: isEditOpen, setIsOpen: setIsEditOpen, openModal: openEditModal } = useModal(false);
  const [editingTechnique, setEditingTechnique] = useState<CounselTechniqueResponseDto | null>(null);

  const handleAddTechnique = () => {
    openAddModal();
  };

  const handleEditName = (technique: CounselTechniqueResponseDto) => {
    setEditingTechnique(technique);
    openEditModal();
  };

  return (
    <div className="scrollbar-hide h-full w-full overflow-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#68676A]">상담기법</h3>
        <div className="space-x-2">
          <Button
            className="rounded-full bg-[#736A84]"
            onClick={handleAddAndDeleteTechnique}
            disabled={mode === 'EDIT'}
            size="sm"
          >
            {mode === 'ADDANDDELETE' ? '완료' : '추가/삭제'}
          </Button>
          <Button
            className="rounded-full bg-[#736A84]"
            onClick={handleEditTechnique}
            disabled={mode === 'ADDANDDELETE'}
            size="sm"
          >
            {mode === 'EDIT' ? '완료' : '수정'}
          </Button>
        </div>
      </div>

      <div className="mb-4 mt-2 h-[1px] bg-[#ECE9F1]" />

      <GraphLayout
        mode={mode}
        techniques={techniques}
        setTechniques={setTechniques}
        onEditName={handleEditName}
        onAddTechnique={handleAddTechnique}
      />
      <AddTechniqueModal isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
      <EditTechniqueModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        technique={editingTechnique}
        onSave={handleSaveTechnique}
      />
    </div>
  );
};

export default Technique;
