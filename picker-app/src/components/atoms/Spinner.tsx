import React, { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { useTheme } from '@emotion/react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Icon } from 'components/atoms/Icon';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  className?: string;
};

/**
 * とりあえずページ全体にかけるSpinner
 */
export const Spinner: FC<Props> = ({ className }) => {
  const theme = useTheme();

  return (
    <div
      className={cx(
        css`
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: ${$spacing.md};
          pointer-events: none;
          background-color: ${theme.backgroundHover};
        `,
        className
      )}
    >
      <Icon icon={faSpinner} spinPulse size={'2xl'} />
    </div>
  );
};
