import { css } from '@emotion/css';

export type TransitionName = 'fade' | 'slideIn';

//import { TransitionClasses } from '@headlessui/react'; がなぜか読み込めない
export interface TransitionClasses {
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  entered?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}

export const $transitions: { [name in TransitionName]: TransitionClasses } = {
  fade: {
    leave: css`
      transition: opacity ease-in 100ms;
    `,
    leaveFrom: css`
      opacity: 1;
    `,
    leaveTo: css`
      opacity: 0;
    `,
    enter: css`
      transition: opacity ease-in 100ms;
    `,
    enterTo: css`
      opacity: 1;
    `,
  },
  slideIn: {
    leave: css`
      transition: transform ease-in 200ms;
    `,
    leaveFrom: css`
      transform: translateX(0);
    `,
    leaveTo: css`
      transform: translateX(100%);
    `,
    enter: css`
      transition: transform ease-in 200ms;
    `,
    enterFrom: css`
      transform: translateX(100%);
    `,
    enterTo: css`
      transform: translateX(0);
    `,
  },
};
