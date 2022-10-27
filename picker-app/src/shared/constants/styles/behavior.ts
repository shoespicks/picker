import { css } from '@emotion/css';
import { Theme } from '@emotion/react';

export const $behavior = {
  /**
   * ホバー時に黒背景が横から流れるアニメーション
   */
  hoverSwipe: (theme: Theme) => css`
    position: relative;
    transition: color 100ms ease-in;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-flex;
      width: 100%;
      height: 100%;
      content: '';
      background-color: ${theme.main};
      transition: transform 200ms ease-in-out, background-color 100ms ease-in;
      transform: scale(0, 1);
      transform-origin: left top;
    }

    > * {
      transition: color 100ms ease-in;
    }

    &:hover {
      color: ${theme.textInverse};

      > * {
        color: ${theme.textInverse};
      }

      &::after {
        transform: scale(1, 1);
        transform-origin: right top;
      }
    }

    &:active {
      &:hover {
        color: ${theme.textDefault};

        &::after {
          background-color: ${theme.background};
        }
      }
    }

    > * {
      z-index: 1;
    }
  `,

  /**
   * ホバー時に黒背景が横から流れるアニメーション
   */
  overlayHover: (theme: Theme) => css`
    position: relative;

    ::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      content: '';
      background-color: transparent;
      transition: background-color 150ms ease-in;
    }

    &:hover {
      ::after {
        background-color: ${theme.backgroundHover};
      }
    }
  `,
};
