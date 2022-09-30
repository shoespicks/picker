export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const mediaGreaterThan = (key: keyof typeof breakpoints) => `@media (min-width: ${breakpoints[key]}px)`;
