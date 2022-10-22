import { css } from '@emotion/css';
import { Theme } from '@emotion/react';

export const $behavior = {
  /**
   * ホバー時に黒背景が横から流れるアニメーション
   */
  hoverSwipe: (theme: Theme) => css`
    position: relative;
    transition: color ease-in 100ms;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-flex;
      width: 100%;
      height: 100%;
      content: '';
      background-color: ${theme.main};
      transition: transform ease-in-out 200ms, background-color ease-in 100ms;
      transform: scale(0, 1);
      transform-origin: left top;
    }

    > * {
      transition: color ease-in 100ms;
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
      transition: background-color ease-in 150ms;
    }

    &:hover {
      ::after {
        background-color: ${theme.backgroundHover};
      }
    }
  `,
};
