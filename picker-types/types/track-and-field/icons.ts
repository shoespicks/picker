// https://docs.google.com/spreadsheets/d/1C76UvztImMsTH1SlqnjetZOd9Je_1dQBUuF0yQHnJDE/edit#gid=532234525
export const iconNames = [
  'hold-fit',
  'stability',
  'non-injury',
  'light',
  'repulse',
  'sole-soft',
  'dual-ground',
  'soleAngle',
  'pro',
  'beginner',
  'specialized',
  'take-off',
  'width',
  'good',
  'caution',
] as const;

export type IconName = typeof iconNames[number];
