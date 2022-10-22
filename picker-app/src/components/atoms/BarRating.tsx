import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';

type Props = {
  value?: number;
  max?: number;
  className?: string;
};

export const BarRating: FC<Props> = ({ value = 0, max = 5, className }) => {
  const styles = getStyles(useTheme());
  return (
    <div className={styles.host(max)}>
      {Array.from({ length: max }).map((_, index) => (
        <span key={index} className={styles.bar(value - index || 0)} />
      ))}
    </div>
  );
};

const getStyles = (theme: Theme) => ({
  host: (max: number) => css`
    display: grid;
    grid-template-columns: repeat(${max}, 1fr);
    gap: 1px;
  `,
  bar: (progress: number) => css`
    position: relative;
    height: 4px;
    overflow: hidden;
    border: 1px solid ${theme.main};
    border-radius: 1px;

    ::after {
      position: absolute;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      content: '';
      background-color: ${theme.main};
      transform: scale(${progress}, 1);
      transform-origin: left top;
    }
  `,
});
