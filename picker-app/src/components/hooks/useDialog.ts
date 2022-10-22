import { useCallback } from 'react';
import { useRouter } from 'next/router';

export const useDialog = (isOpenChange?: (isOpen: boolean) => void) => {
  const { events } = useRouter();

  const close = useCallback(() => {
    isOpenChange && isOpenChange(false);
    events.off('routeChangeStart', close);
  }, [events, isOpenChange]);

  const open = useCallback(() => {
    isOpenChange && isOpenChange(true);
    events.on('routeChangeStart', close); // 画面遷移されたら閉じる処理を発火する
  }, [close, events, isOpenChange]);

  return { open, close };
};
