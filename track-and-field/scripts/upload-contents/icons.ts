// https://docs.google.com/spreadsheets/d/1C76UvztImMsTH1SlqnjetZOd9Je_1dQBUuF0yQHnJDE/edit#gid=532234525
export type IconName =
  | 'hold-fit'
  | 'stability'
  | 'non-injury'
  | 'light'
  | 'repulse'
  | 'sole-soft'
  | 'dual-ground'
  | 'soleAngle'
  | 'pro'
  | 'beginner'
  | 'specialized'
  | 'take-off'
  | 'width'
  | 'good'
  | 'caution';

export const icons: { [key in IconName]: string } = {
  'hold-fit': 'fas fa-hands',
  stability: 'fas fa-balance-scale',
  'non-injury': 'fas fa-user-injured',
  light: 'fas fa-feather-alt',
  repulse: 'fas fa-compress-alt',
  'sole-soft': 'fas fa-hand-holding-heart',
  'dual-ground': 'fas fa-globe-americas',
  soleAngle: 'fas fa-less-than-equal',
  pro: 'fas fa-user-plus',
  beginner: 'fas fa-baby',
  specialized: 'fas fa-hat-wizard',
  'take-off': 'fas fa-thumbtack',
  width: 'fas fa-arrows-alt-h',
  good: 'far fa-thumbs-up',
  caution: 'fas fa-exclamation-circle'
};
