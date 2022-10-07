import React, { type FC, PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Button } from 'component/atoms/Button';
import { Input } from 'component/atoms/input/Input';
import { setSolidShadow } from 'shared/constants/styles/common';
import { $inputBorderRadius, $inputDefaultHeight } from 'shared/constants/styles/size';
import { Size } from 'shared/types/style-props';

type Props = {
  buttonIcon?: IconDefinition;
  buttonLabel?: string;
  buttonWidth?: Size;
};

export const InputButton: FC<PropsWithChildren<Props>> = props => {
  const { buttonIcon, buttonLabel } = props;
  const iconOnly = !!buttonIcon && !buttonLabel;

  return (
    <div className={styles.InputButtonContainer}>
      <Input className={styles.Input} />
      <Button
        icon={buttonIcon}
        label={buttonLabel}
        width={iconOnly ? $inputDefaultHeight : undefined}
        className={styles.Button}
      />
    </div>
  );
};

const styles = {
  InputButtonContainer: css`
    display: flex;
    align-items: center;
    border-radius: ${$inputBorderRadius};

    ${setSolidShadow()}
  `,
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
};
