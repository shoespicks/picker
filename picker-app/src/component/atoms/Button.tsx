import React, { ComponentPropsWithoutRef, type FC } from 'react';
import { css, cx } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Icon } from 'component/atoms/Icon';
import { $behavior } from 'shared/constants/styles/behavior';
import { setSolidShadow } from 'shared/constants/styles/common';
import { $inputDefaultHeight, Size } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

export type ButtonColor = 'primary' | 'default';

type Props = ComponentPropsWithoutRef<'button'> & {
  color?: ButtonColor;
  icon?: IconDefinition;
  label?: string;
  width?: Size;
  className?: string;
};

export const Button: FC<Props> = ({ color = 'default', icon, label, width, className, ...buttonProps }) => {
  const theme: Theme = useTheme();

  return (
    <button
      {...buttonProps}
      className={cx(
        styles.button(theme),
        className,
        css`
          width: ${width};
        `
      )}
      data-color={color}
    >
      {!!icon && <Icon icon={icon} />}
      {!!label && <span>{label}</span>}
    </button>
  );
};

const styles = {
  button: (theme: Theme) =>
    cx(
      $behavior.hoverSwipe(theme),
      css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: ${$inputDefaultHeight};
        padding: 0 ${$spacing.md};
        line-height: 1;
        cursor: pointer;
        border: 1px solid ${theme.border};
        border-radius: 2px;

        > * {
          z-index: 1;

          + * {
            margin-left: ${$spacing.sm};
          }
        }

        &[data-color='primary'] {
          background-color: ${theme.primary};
        }
      `,
      setSolidShadow(theme.border)
    ),
};
