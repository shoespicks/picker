import { css } from '@emotion/css';
import { Size } from 'shared/constants/styles/size';

export const $common = {
  truncate: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};

export const setSolidShadow = (color: string, size: Size = '2px') => {
  return css`
    box-shadow: ${size} ${size} ${color};
  `;
};
