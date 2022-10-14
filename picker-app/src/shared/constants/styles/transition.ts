import { css } from '@emotion/css';

export type TransitionName = 'fade';

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
    enterFrom: css`
      opacity: 0;
    `,
  },
};
