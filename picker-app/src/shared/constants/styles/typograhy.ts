import { css } from '@emotion/css';

export const h1Style = css`
  font-size: 32px;
  font-weight: 700;
`;

export const h2Style = css`
  font-size: 24px;
  font-weight: 700;
`;

export const h3Style = css`
  font-size: 20px;
  font-weight: 700;
`;

export const h4Style = css`
  font-size: 18px;
  font-weight: 700;
`;

export const h5Style = css`
  font-size: 16px;
  font-weight: 700;
`;

export const aStyle = (underline?: boolean) => css`
  text-decoration: ${underline ? 'underline' : 'none'};
`;

export const labelStyle = css`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
`;

export const smallStyle = css`
  font-size: 12px;
`;

export const strongStyle = css`
  font-size: 16px;
  font-weight: 700;
`;

export const pStyle = css`
  font-size: 16px;
`;

export const spanStyle = css`
  font-size: 14px;
`;

export const textUppercaseStyle = css`
  text-transform: uppercase;
`;

export const boldStyle = css`
  font-weight: 700;
`;

export const textLoudStyle = css`
  font-family: 'Roboto Condensed', 'Noto Sans JP', sans-serif;
  letter-spacing: 0.05em;
`;
