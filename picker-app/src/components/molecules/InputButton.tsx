import React, { type FC, MouseEventHandler, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Button, ButtonColor } from 'components/atoms/Button';
import { Input } from 'components/atoms/input/Input';
import { setSolidShadow } from 'shared/constants/styles/common';
import { $inputBorderRadius, $inputDefaultHeight, Size } from 'shared/constants/styles/size';

type Props = {
  buttonColor?: ButtonColor;
  buttonIcon?: IconDefinition;
  buttonLabel?: string;
  buttonWidth?: Size;
  placeholder?: string;
  onClick?: MouseEventHandler;
};

export const InputButton: FC<PropsWithChildren<Props>> = ({
  buttonColor,
  buttonIcon,
  buttonLabel,
  buttonWidth,
  placeholder,
  onClick,
}) => {
  const iconOnly = !!buttonIcon && !buttonLabel;
  const styles = getStyles(useTheme());

  return (
    <div className={styles.InputButtonContainer}>
      <Input placeholder={placeholder} className={styles.Input} />
      <Button
        color={buttonColor}
        icon={buttonIcon}
        label={buttonLabel}
        width={iconOnly ? $inputDefaultHeight : buttonWidth}
        className={styles.Button}
        onClick={onClick}
      />
    </div>
  );
};

const getStyles = (theme: Theme) => ({
  InputButtonContainer: cx(
    css`
      display: flex;
      align-items: center;
      border-radius: ${$inputBorderRadius};
    `,
    setSolidShadow(theme.border)
  ),
  Input: css`
    flex: 1 1 auto;
    min-width: 1px;
    border-radius: ${$inputBorderRadius} 0 0 ${$inputBorderRadius};
    box-shadow: none;
  `,
  Button: css`
    flex: 0 0 auto;
    border-left: 0;
    border-radius: 0 ${$inputBorderRadius} ${$inputBorderRadius} 0;
  `,
});
