import React, { FC } from 'react';
import { css, cx } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { $headerSize } from 'shared/constants/styles/size';
import { $easeInOutQuint } from 'shared/constants/styles/transition';

type Props = {
  isOpen?: boolean;
  className?: string;
  onClick?: (isOpen: boolean) => void;
};

export const HumbergerButton: FC<Props> = ({ isOpen = false, className, onClick }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const handleClick = () => {
    onClick && onClick(isOpen);
  };

  return (
    <button
      type="button"
      className={cx(className, styles.humberger, isOpen ? styles.humbergerOpen : undefined)}
      onClick={handleClick}
    ></button>
  );
};

const getStyles = (theme: Theme) => ({
  humberger: css`
    position: relative;
    width: ${$headerSize};
    height: ${$headerSize};
    cursor: pointer;

    &::before,
    &::after {
      position: absolute;
      display: inline-block;
      width: 100%;
      height: 2px;
      content: '';
      background-color: ${theme.textInverse};
      transition: transform 400ms ${$easeInOutQuint}, top 400ms ${$easeInOutQuint};
    }

    &::before {
      top: calc(50% - 3px);
      transform: translateY() (-50%);
    }

    &::after {
      top: calc(50% + 3px);
      transform: translateY(-50%);
    }
  `,
  humbergerOpen: css`
    &::before {
      top: calc(50%);
      transform: rotate(-20deg);
    }

    &::after {
      top: calc(50%);
      transform: rotate(20deg);
    }
  `,
});
