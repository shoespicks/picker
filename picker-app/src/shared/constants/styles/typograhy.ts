import { css } from '@emotion/css';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';

export const h1Style = css`
  font-size: 20px;
  font-weight: 700;

  ${mediaGreaterThan('sm')} {
    font-size: 32px;
  }
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
  font-weight: 500;
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

export const semiBoldStyle = css`
  font-weight: 500;
`;

export const boldStyle = css`
  font-weight: 700;
`;

export const loudFontfamily = `'Roboto Condensed', 'Noto Sans JP', sans-serif`;

export const textLoudStyle = css`
  font-family: ${loudFontfamily};
  letter-spacing: 0.02em;
`;
