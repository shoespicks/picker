import { useCallback, useState } from 'react';

export const useDrawer = (onOpen?: () => void, onClose?: () => void) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const open = useCallback(() => {
    setIsDrawerOpen(true);
    onOpen && onOpen();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsDrawerOpen(false);
    onClose && onClose();
  }, [onClose]);

  const toggle = useCallback(
    (isOpen: boolean) => {
      isOpen ? open() : close();
    },
    [close, open]
  );
  return { isDrawerOpen, open, close, toggle };
};
