import { css } from '@emotion/css';
import { $colors, $typographyColors } from 'shared/constants/styles/colors';

export const $animation = {
  /**
   * ホバー時に黒背景が横から流れるアニメーション
   */
  hoverSwipe: css`
    position: relative;
    transition: color ease-in 200ms;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-flex;
      width: 100%;
      height: 100%;
      content: '';
      background-color: ${$colors.main};
      transition: transform ease-in-out 200ms;
      transform: scale(0, 1);
      transform-origin: left top;
    }

    &:hover {
      color: ${$typographyColors.inverse};

      &::after {
        transform: scale(1, 1);
        transform-origin: right top;
      }
    }

    &:active {
      &:hover {
        color: ${$typographyColors.default};

        &::after {
          background-color: ${$colors.background};
        }
      }
    }

    > * {
      z-index: 1;
    }
  `,
};
