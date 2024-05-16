import { create } from 'zustand';

export type ModalType = 'Image' | 'Delete';

export interface ModalProps {
  apiUrl?: string;
  data?: any; // Temporary placeholder for data
}

interface ModalStore {
  type: ModalType | null;
  props: ModalProps;
  isOpen: boolean;
  onOpen: (type: ModalType, props?: ModalProps) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  props: {},
  isOpen: false,
  onOpen: (type: ModalType, props: ModalProps = {}) => {
    set({ type, props, isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false, type: null, props: {} });
  },
}));

export default useModal;
