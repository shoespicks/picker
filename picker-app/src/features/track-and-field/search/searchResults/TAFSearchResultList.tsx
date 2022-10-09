import React, { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { TAFSearchResultCard } from 'features/track-and-field/search/searchResults/TAFSearchResultCard';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  className?: string;
};

export const TAFSearchResultList: FC<Props> = ({ className }) => {
  return (
    <ul className={cx(styles.root, className)}>
      {Array.from({ length: 11 }).map((value, index) => (
        <li key={index}>
          <TAFSearchResultCard />
        </li>
      ))}
    </ul>
  );
};

const styles = {
  root: css`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: ${$spacing.md};

    ${mediaGreaterThan('md')} {
      grid-template-columns: 1fr 1fr;
    }
  `,
};
