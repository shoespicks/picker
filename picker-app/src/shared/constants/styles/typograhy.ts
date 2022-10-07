import { css } from '@emotion/css';
import { $colors } from 'shared/constants/styles/colors';

const typographyBase = css`
  color: ${$colors.main};
`;

export const h1Style = css`
  ${typographyBase};

  font-size: 32px;
  font-weight: bold;
`;

export const h2Style = css`
  ${typographyBase};

  font-size: 24px;
  font-weight: bold;
`;

export const h3Style = css`
  ${typographyBase};

  font-size: 20px;
  font-weight: bold;
`;

export const aStyle = css`
  ${typographyBase};

  text-decoration: underline;
`;
