import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2Icon } from 'lucide-react';
import { FC } from 'react';

interface ModelConfirmationDeleteProductProps {
  setOpen: (value: boolean) => void;
  onDeleteProduct: () => void;
}

const ModalConfirmationDeleteProduct: FC<
  ModelConfirmationDeleteProductProps
> = ({ setOpen, onDeleteProduct }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger><Trash2Icon /></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah kamu ingin melanjutkan?</AlertDialogTitle>
          <AlertDialogDescription>
            Jika dilanjutkan menghapus, data akan otomatis menghilang
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Tidak
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteProduct}>
            Lanjut
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalConfirmationDeleteProduct;
