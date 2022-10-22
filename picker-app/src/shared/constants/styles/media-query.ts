import { css } from '@emotion/css';

export const breakpoints: { [key in BreakpointCode]: number } = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const;

export type BreakpointCode = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const mediaGreaterThan = (key: BreakpointCode) => `@media (min-width: ${breakpoints[key]}px)`;
export const mediaLessThan = (key: BreakpointCode) => `@media (max-width: ${breakpoints[key]}px)`;

export const hideOverBreakPointStyle = (breakPoint: BreakpointCode) => css`
  ${mediaGreaterThan(breakPoint)} {
    display: none;
  }
`;

export const visibleOverBreakPointStyle = (breakPoint: BreakpointCode) => css`
  ${mediaLessThan(breakPoint)} {
    display: none;
  }
`;
