import React, { type FC, PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { Icon } from 'component/atoms/Icon';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = FontAwesomeIconProps & {
  icon: IconDefinition;
  text: string;
};

export const IconText: FC<PropsWithChildren<Props>> = ({ text, ...iconProps }) => (
  <span
    className={css`
      display: inline-flex;
      gap: ${$spacing.xs};
      align-items: center;
    `}
  >
    <Icon {...iconProps}></Icon>
    <span>{text}</span>
  </span>
);
