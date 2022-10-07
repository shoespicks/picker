import { css } from '@emotion/css';
import { TransitionClasses } from '@headlessui/react';

export type TransitionName = 'fade';

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
