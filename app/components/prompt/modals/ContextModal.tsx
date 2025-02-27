import { useEffect, useState } from 'react';

import Modal from './Modal';
import Button from '../Button';

import { ContextModalProps } from '~/types/modal';

const ContextModal = ({ isOpen, setIsOpen, item }: ContextModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setContent(item.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [item]);

  const handleSave = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex w-[40rem] flex-col gap-4">
        <h2 className="text-lg font-semibold">Context</h2>

        <div>
          <label className="mb-1 block" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="title"
          />
        </div>

        <div>
          <label className="mb-1 block" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="row-4 w-full rounded border p-2"
            rows={8}
            placeholder="content"
          />
        </div>

        <div className="flex justify-end">
          <Button text="Save" handleClick={handleSave} color="bg-green-500" />
        </div>
      </div>
    </Modal>
  );
};

export default ContextModal;
