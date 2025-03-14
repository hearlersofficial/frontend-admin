import { useState } from 'react';
import { useLoaderData } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from '~/components/ui/dialog';

import { ContextType, InstructionType, TechniqueModalProps, ToneType } from '~/types/prompt';

const TechniqueModal = ({ isOpen, setIsOpen, addNewCard }: TechniqueModalProps) => {
  const { contexts, instructions, tones } = useLoaderData<{
    contexts: ContextType[];
    instructions: InstructionType[];
    tones: ToneType[];
  }>();

  const [name, setName] = useState('');
  const [selectedContext, setSelectedContext] = useState<ContextType | null>(null);
  const [selectedInstruction, setSelectedInstruction] = useState<InstructionType | null>(null);
  const [selectedTone, setSelectedTone] = useState<ToneType | null>(null);

  const handleSave = () => {
    // console.log(selectedContext?.id);
    // console.log(selectedInstruction?.id);
    // console.log(selectedTone?.id);

    addNewCard(name);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Context</DialogTitle>

          <div>
            <label className="mb-1 block" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="name"
            />
          </div>

          {/* Context */}
          <div>
            <label htmlFor="context" className="block text-sm font-medium">
              Context
            </label>
            <select
              id="context"
              value={selectedContext?.id || ''}
              onChange={(e) => setSelectedContext(contexts.find((context) => context.id === e.target.value) || null)}
              className="w-full rounded border p-2"
            >
              <option value="" disabled>
                Context
              </option>
              {contexts.map((context) => (
                <option key={context.id} value={context.id}>
                  {context.name}
                </option>
              ))}
            </select>
          </div>

          {/* Instruction */}
          <div>
            <label htmlFor="instruction" className="block text-sm font-medium">
              Instruction
            </label>
            <select
              id="instruction"
              value={selectedInstruction?.id || ''}
              onChange={(e) =>
                setSelectedInstruction(instructions.find((instruction) => instruction.id === e.target.value) || null)
              }
              className="w-full rounded border border-gray-300 p-2"
            >
              <option value="" disabled>
                Instruction
              </option>
              {instructions.map((instruction) => (
                <option key={instruction.id} value={instruction.id}>
                  {instruction.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tone */}
          <div>
            <label htmlFor="tone" className="block text-sm font-medium">
              Tone
            </label>
            <select
              id="tone"
              value={selectedTone?.id || ''}
              onChange={(e) => setSelectedTone(tones.find((tone) => tone.id === e.target.value) || null)}
              className="w-full rounded border border-gray-300 p-2"
            >
              <option value="" disabled>
                Tone
              </option>
              {tones.map((tone) => (
                <option key={tone.id} value={tone.id}>
                  {tone.name}
                </option>
              ))}
            </select>
          </div>

          <DialogFooter>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TechniqueModal;
