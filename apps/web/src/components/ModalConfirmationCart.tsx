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
import { FC } from 'react';

interface ModalConfirmationProps {
  setOpen: (value: boolean) => void;
  generateWhatsapp: () => void;
}

const ModalConfirmation:FC<ModalConfirmationProps> = ({ setOpen, generateWhatsapp }) => {
  return (
      <AlertDialog>
        <AlertDialogTrigger>Klik untuk melanjutkan pemesanan</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah kamu ingin melanjutkan?</AlertDialogTitle>
            <AlertDialogDescription>
              Klik link akan dilanjutkan ke whatsapp, keranjang belanjaan akan otomatis
              kosong
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Tidak</AlertDialogCancel>
            <AlertDialogAction onClick={generateWhatsapp}>Lanjut</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
};

export default ModalConfirmation;
