import React, { ComponentPropsWithoutRef, type FC } from 'react';
import { css, cx } from '@emotion/css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Icon } from 'component/atoms/Icon';
import { $animation } from 'shared/constants/styles/animation';
import { $colors } from 'shared/constants/styles/colors';
import { setSolidShadow } from 'shared/constants/styles/common';
import { $inputDefaultHeight } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';
import { Size } from 'shared/types/style-props';

type Props = ComponentPropsWithoutRef<'button'> & {
  width?: Size;
  icon?: IconDefinition;
  label?: string;
  className?: string;
};

export const Button: FC<Props> = props => {
  const { className, width } = props;
  const { icon, label } = props;
  return (
    <button
      {...props}
      className={cx(
        styles.button,
        className,
        css`
          width: ${width};
        `
      )}
    >
      {!!icon && <Icon icon={icon} />}
      {!!label && <span>{label}</span>}
    </button>
  );
};

const styles = {
  button: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: ${$inputDefaultHeight};
    padding: 0 ${$spacing.md};
    line-height: 1;
    cursor: pointer;
    border: 1px solid ${$colors.main};
    border-radius: 2px;

    ${setSolidShadow()}
    ${$animation.hoverSwipe};

    > * {
      z-index: 1;

      + * {
        margin-left: ${$spacing.sm};
      }
    }
  `,
};
