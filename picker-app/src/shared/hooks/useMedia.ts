import { useCallback, useEffect, useState } from 'react';
import { BreakpointCode, breakpoints } from 'shared/constants/styles/media-query';

/**
 * メディアクエリのjs版
 */
export const useMediaGraterThan = (code: BreakpointCode): boolean => {
  const getMatchMedia = useCallback(() => {
    return typeof window !== 'undefined' ? window.matchMedia(`(min-width: ${breakpoints[code]}px)`) : undefined;
  }, [code]);

  const [matchQuery, setMatchQuery] = useState(getMatchMedia());
  const handleQueryListener = useCallback(() => setMatchQuery(getMatchMedia()), [getMatchMedia]);

  useEffect(() => {
    const matchMediaResult = getMatchMedia();
    setMatchQuery(matchMediaResult);
    typeof matchMediaResult?.addEventListener === 'function' &&
      matchMediaResult.addEventListener('change', handleQueryListener);
    return () =>
      typeof matchMediaResult?.removeEventListener === 'function'
        ? matchMediaResult.removeEventListener('change', handleQueryListener)
        : undefined;
  }, [getMatchMedia, handleQueryListener]);

  return matchQuery?.matches || false;
};
