import { css } from '@emotion/css';

export type TransitionName = 'fade' | 'slideIn' | 'popup';

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

export const $easeInOutQuint = 'cubic-bezier(0.83, 0, 0.17, 1)';

export const $transitions: { [name in TransitionName]: TransitionClasses } = {
  fade: {
    leave: css`
      transition: opacity 100ms ${$easeInOutQuint};
    `,
    leaveFrom: css`
      opacity: 1;
    `,
    leaveTo: css`
      opacity: 0;
    `,
    enter: css`
      transition: opacity 100ms ${$easeInOutQuint};
    `,
    enterTo: css`
      opacity: 1;
    `,
  },
  slideIn: {
    leave: css`
      transition: transform 200ms ${$easeInOutQuint};
    `,
    leaveFrom: css`
      transform: translateX(0);
    `,
    leaveTo: css`
      transform: translateX(100%);
    `,
    enter: css`
      transition: transform 200ms ${$easeInOutQuint};
    `,
    enterFrom: css`
      transform: translateX(100%);
    `,
    enterTo: css`
      transform: translateX(0);
    `,
  },
  popup: {
    leave: css`
      transition: transform 180ms ${$easeInOutQuint}, opacity 180ms ${$easeInOutQuint};
    `,
    leaveFrom: css`
      transform: scale(1);
      opacity: 1;
    `,
    leaveTo: css`
      opacity: 0;
      transform: scale(0.95) translateY(3%);
    `,
    enter: css`
      transition: transform 180ms ${$easeInOutQuint}, opacity 180ms ${$easeInOutQuint};
    `,
    enterFrom: css`
      transform: scale(0.8) translateY(10%);
      opacity: 0;
    `,
    enterTo: css`
      transform: scale(1);
      opacity: 1;
    `,
  },
};
