import { useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return {
    isModalOpen,
    open: () => setIsModalOpen(true),
    close: () => setIsModalOpen(false),
    setIsModalOpen,
  };
};
