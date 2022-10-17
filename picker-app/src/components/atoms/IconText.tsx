import React, { type FC, PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { Icon } from 'components/atoms/Icon';
import { Span } from 'components/atoms/Typography';
import { Size } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = FontAwesomeIconProps & {
  icon: IconDefinition;
  text: string;
  fontSize?: Size;
};

export const IconText: FC<PropsWithChildren<Props>> = ({ text, fontSize, ...iconProps }) => (
  <span
    className={css`
      display: inline-flex;
      gap: ${$spacing.xs};
      align-items: center;
    `}
  >
    <Icon {...iconProps}></Icon>
    <Span fontSize={fontSize}>{text}</Span>
  </span>
);
