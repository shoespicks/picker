import { css } from '@emotion/css';
import { $colors } from 'shared/constants/styles/colors';
import { Size } from 'shared/constants/styles/size';

export const $common = {
  truncate: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};

export const setSolidShadow = (size: Size = '2px', color = $colors.main) => css`
  box-shadow: ${size} ${size} ${color};
`;
