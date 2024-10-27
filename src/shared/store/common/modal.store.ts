import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;

  title: string;
  description: string;
  content: React.ReactNode;

  openModal: ({
    title,
    description,
    content,
  }: {
    title: string;
    description: string;
    content: React.ReactNode;
  }) => void;
  hideModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,

  title: '',
  description: '',
  content: null,

  openModal: ({ title, description, content }) => {
    set({ isOpen: true, title, description, content });
  },

  hideModal: () => {
    set({ isOpen: false });
  },
}));

export const useModal = () => {
  const { isOpen, hideModal, openModal } = useModalStore();

  return {
    isOpen,
    hideModal,
    openModal,
  };
};
