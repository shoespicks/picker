import { useCallback, useEffect, useState } from 'react';
import { throttle } from 'lodash-es';

export const useScroll = () => {
  const [isScrolledTop, setIsScrolledTop] = useState(true);

  const changeState = useCallback(
    throttle(() => {
      return setIsScrolledTop(window.scrollY < 3);
    }, 300),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', changeState);
    return () => window.removeEventListener('scroll', changeState);
  }, [changeState]);

  return { isScrolledTop };
};
