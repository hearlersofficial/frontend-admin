import { Dialog, DialogContent } from '~/components/ui/dialog';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  maxWidth?: MaxWidth;
}

const widthMap = {
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
} as const;

type MaxWidth = keyof typeof widthMap;

const getMaxWidthClass = (maxWidth: MaxWidth) => {
  return widthMap[maxWidth];
};

export const Modal = ({ isOpen, setIsOpen, children, maxWidth = '3xl' }: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={`${getMaxWidthClass(maxWidth as MaxWidth)}`}>
        <div className="flex flex-col gap-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
