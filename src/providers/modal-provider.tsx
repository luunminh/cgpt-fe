'use client';

import { useModalStore } from '@shared/store';
import Modal from '@ui/modal';

type Props = {};

const ModalProvider: React.FC<Props> = () => {
  const { isOpen, hideModal, title, description, content } = useModalStore();

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen onClose={hideModal} title={title} description={description} children={content} />
  );
};

export default ModalProvider;
