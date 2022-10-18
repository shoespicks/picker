import React, { type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { TypographyColors } from 'shared/constants/styles/colors';
import { $common } from 'shared/constants/styles/common';
import { Size } from 'shared/constants/styles/size';
import {
  boldStyle,
  h1Style,
  h2Style,
  h3Style,
  h4Style,
  h5Style,
  pStyle,
  semiBoldStyle,
  smallStyle,
  spanStyle,
  strongStyle,
  textLoudStyle,
  textUppercaseStyle,
} from 'shared/constants/styles/typograhy';

type TypographyProps = {
  fontSize?: Size;
  color?: TypographyColors;
  upperCase?: boolean;
  loud?: boolean;
  semiBold?: boolean;
  bold?: boolean;
  truncate?: boolean;
  className?: string;
};

const useTypography = () => {
  const { text } = useTheme();
  return { setTypographyStyle: setTypographyStyle(text) };
};

export const setTypographyStyle =
  (textColorTheme: { [key in TypographyColors]: string }) =>
  (
    props: {
      baseClassName: string;
    } & TypographyProps
  ) => {
    return cx(
      props.baseClassName,
      { [textUppercaseStyle]: props?.upperCase },
      { [textLoudStyle]: props?.loud },
      { [semiBoldStyle]: props?.semiBold },
      { [boldStyle]: props?.bold },
      { [$common.truncate]: props?.truncate },
      css`
        font-size: ${props?.fontSize};
        color: ${props?.color && textColorTheme[props.color]};
      `,
      props.className
    );
  };

export const H1: FC<PropsWithChildren<TypographyProps>> = ({ children, ...props }) => {
  const { setTypographyStyle } = useTypography();
  return <h1 className={setTypographyStyle({ baseClassName: h1Style, ...props })}>{children}</h1>;
};

export const H2: FC<PropsWithChildren<TypographyProps>> = ({ children, ...props }) => {
  const { setTypographyStyle } = useTypography();
  return <h2 className={setTypographyStyle({ baseClassName: h2Style, ...props })}>{children}</h2>;
};

export const H3: FC<PropsWithChildren<TypographyProps>> = ({ children, ...props }) => {
  const { setTypographyStyle } = useTypography();
  return <h3 className={setTypographyStyle({ baseClassName: h3Style, ...props })}>{children}</h3>;
};

export const H4: FC<PropsWithChildren<TypographyProps>> = ({ children, ...props }) => {
  const { setTypographyStyle } = useTypography();
  return <h4 className={setTypographyStyle({ baseClassName: h4Style, ...props })}>{children}</h4>;
};

export const H5: FC<PropsWithChildren<TypographyProps>> = ({ children, ...props }) => {
  const { setTypographyStyle } = useTypography();
  return <h4 className={setTypographyStyle({ baseClassName: h5Style, ...props })}>{children}</h4>;
};

export const P: FC<PropsWithChildren<TypographyProps>> = ({ children, ...props }) => {
  const { setTypographyStyle } = useTypography();
  return <p className={setTypographyStyle({ baseClassName: pStyle, ...props })}>{children}</p>;
};

export const Small: FC<PropsWithChildren<TypographyProps>> = ({ children, ...props }) => {
  const { setTypographyStyle } = useTypography();
  return <small className={setTypographyStyle({ baseClassName: smallStyle, ...props })}>{children}</small>;
};

export const Strong: FC<PropsWithChildren<TypographyProps>> = ({ children, ...props }) => {
  const { setTypographyStyle } = useTypography();
  return <strong className={setTypographyStyle({ baseClassName: strongStyle, ...props })}>{children}</strong>;
};

export const Span: FC<PropsWithChildren<TypographyProps>> = ({ children, ...props }) => {
  const { setTypographyStyle } = useTypography();
  return <span className={setTypographyStyle({ baseClassName: spanStyle, ...props })}>{children}</span>;
};
