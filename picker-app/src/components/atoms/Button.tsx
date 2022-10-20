import React, { ComponentPropsWithoutRef, type FC, MouseEventHandler, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Icon } from 'components/atoms/Icon';
import { Span } from 'components/atoms/Typography';
import { $behavior } from 'shared/constants/styles/behavior';
import { TypographyColors } from 'shared/constants/styles/colors';
import { setSolidShadow } from 'shared/constants/styles/common';
import { $inputDefaultHeight, Size } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

export type ButtonColor = 'primary' | 'default';
export type ButtonIconPosition = 'left' | 'right' | 'leftInline' | 'rightInline' | 'leftAbsolute' | 'rightAbsolute';

type Props = ComponentPropsWithoutRef<'button'> & {
  color?: ButtonColor;
  icon?: IconDefinition;
  label?: string;
  width?: Size;
  height?: Size;
  fontSize?: Size;
  iconPosition?: ButtonIconPosition;
  labelColor?: TypographyColors;
  className?: string;
  onClick?: MouseEventHandler;
};

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  color = 'default',
  icon,
  label,
  width,
  height,
  iconPosition = 'rightInline',
  fontSize,
  labelColor = 'default',
  className,
  onClick,
  ...buttonProps
}) => {
  const styles = getStyles(useTheme());
  return (
    <button
      {...buttonProps}
      className={cx(
        styles.button(iconPosition, fontSize, height),
        className,
        css`
          width: ${width};
        `
      )}
      onClick={onClick}
      data-color={color}
    >
      {!!icon && <Icon icon={icon} className={styles.icon(iconPosition)} />}
      {!!label && (
        <Span color={labelColor} semiBold>
          {label}
        </Span>
      )}
      {children}
    </button>
  );
};

const getStyles = (theme: Theme) => ({
  button: (iconPosition: ButtonIconPosition, fontSize: Size = '16px', height: Size = $inputDefaultHeight) =>
    cx(
      $behavior.hoverSwipe(theme),
      css`
        display: inline-flex;
        flex-direction: ${iconPosition === 'right' || iconPosition === 'rightInline' ? 'row-reverse' : 'row'};
        gap: ${$spacing.sm};
        align-items: center;
        justify-content: ${iconPosition === 'left' || iconPosition === 'right' ? 'space-between' : 'center'};
        height: ${height};
        padding: 0 ${$spacing.md};
        font-size: ${fontSize};
        line-height: 1;
        color: ${theme.textDefault};
        text-align: center;
        cursor: pointer;
        background-color: ${theme.background};
        border: 1px solid ${theme.border};
        border-radius: 2px;

        > * {
          z-index: 1;
        }

        &[data-color='primary'] {
          background-color: ${theme.primary};
        }
      `,
      setSolidShadow(theme.border)
    ),
  icon: (iconPosition: ButtonIconPosition) =>
    cx({
      [css`
        position: absolute;
        top: 50%;
        right: ${$spacing.md};
        transform: translateY(-50%);
      `]: iconPosition === 'rightAbsolute',
      [css`
        position: absolute;
        top: 50%;
        left: ${$spacing.md};
        transform: translateY(-50%);
      `]: iconPosition === 'leftAbsolute',
    }),
});
