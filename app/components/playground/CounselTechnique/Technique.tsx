import { useState } from 'react';

import { Button } from '~/components/ui/button';
import TechniqueContainer from './TechniqueContainer';

import { CounselTechnique } from '~/types/counselTechnique';

const counselTechniques: CounselTechnique[] = [
  { id: '1', name: '스몰토크, 컨디션체크', toneId: 't1', context: 'c1', instruction: 'i1', sentences: 5 },
  { id: '2', name: '문제 구체화(+공감)', toneId: 't2', context: 'c2', instruction: 'i2', sentences: 5 },
  { id: '3', name: '긍정적 재조직', toneId: 't3', context: 'c3', instruction: 'i3', sentences: 5 },
  { id: '4', name: '감정 해소법 제시', toneId: 't4', context: 'c4', instruction: 'i4', sentences: 5 },
  { id: '5', name: '마무리, 다음 대화 기약', toneId: 't5', context: 'c5', instruction: 'i5', sentences: 5 },
];

const Technique = () => {
  const [selected, setSelected] = useState<string>(counselTechniques[0].id);
  const [mode, setMode] = useState<"ADDANDDELETE" | "EDIT" | "SELECT">("SELECT");

  const [techniques, setTechniques] = useState<CounselTechnique[]>(counselTechniques);

  const handleEditTechnique = () => {
    if (mode === "EDIT") {
      setMode("SELECT");
    } else {
      setMode("EDIT");
    }
  };

  const handleAddAndDeleteTechnique = () => {
    if (mode === "ADDANDDELETE") {
      setMode("SELECT");
    } else {
      setMode("ADDANDDELETE");
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#68676A]">상담기법</h3>
        <div className="space-x-2">
          <Button className="rounded-full bg-[#736A84]" onClick={handleAddAndDeleteTechnique} disabled={mode === "EDIT"} size="sm">
            {mode === "ADDANDDELETE" ? "완료" : "추가/삭제"}
          </Button>
          <Button className="rounded-full bg-[#736A84]" onClick={handleEditTechnique} disabled={mode === "ADDANDDELETE"} size="sm">
            {mode === "EDIT" ? "완료" : "수정"}
          </Button>
        </div>
      </div>

      <div className="mb-4 mt-2 h-[1px] bg-[#ECE9F1]" />

      <TechniqueContainer mode={mode} techniques={techniques} selected={selected} setSelected={setSelected} setTechniques={setTechniques} />
    </div>
  );
  
};
export default Technique;
