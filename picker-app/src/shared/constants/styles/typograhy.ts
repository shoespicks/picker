import { css } from '@emotion/css';

export const h1Style = css`
  font-size: 32px;
  font-weight: bold;
`;

export const h2Style = css`
  font-size: 24px;
  font-weight: bold;
`;

export const h3Style = css`
  font-size: 20px;
  font-weight: bold;
`;

export const h4Style = css`
  font-size: 18px;
  font-weight: bold;
`;

export const h5Style = css`
  font-size: 16px;
  font-weight: bold;
`;

export const aStyle = (underline?: boolean) => css`
  text-decoration: ${underline ? 'underline' : 'none'};
`;

export const labelStyle = css`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
`;
