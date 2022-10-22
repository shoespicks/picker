import React, { FC } from 'react';
import { css } from '@emotion/css';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { A } from 'components/atoms/A';
import { Button } from 'components/atoms/Button';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  amazonUrl?: string;
  rakutenUrl?: string;
  brandPageUrl?: string;
  axis?: 'vertical' | 'horizontal';
};

export const BuyButtons: FC<Props> = ({ amazonUrl, rakutenUrl, brandPageUrl, axis = 'vertical' }) => {
  return (
    <ul
      className={css`
        display: flex;
        flex-direction: ${axis === 'vertical' ? 'column' : 'row'};
        gap: ${$spacing.md};

        > li {
          flex: 1 1 auto;
        }
      `}
    >
      {amazonUrl && (
        <li>
          <A href={amazonUrl}>
            <Button
              label="Amazonで購入"
              icon={axis === 'vertical' ? faChevronCircleRight : undefined}
              color="primary"
              width="100%"
              iconPosition="rightAbsolute"
            />
          </A>
        </li>
      )}
      {rakutenUrl && (
        <li>
          <A href={rakutenUrl}>
            <Button
              label="楽天で購入"
              icon={axis === 'vertical' ? faChevronCircleRight : undefined}
              color="primary"
              width="100%"
              iconPosition="rightAbsolute"
            />
          </A>
        </li>
      )}
      {brandPageUrl && (
        <li>
          <A href={brandPageUrl}>
            <Button
              label="公式サイトで購入"
              icon={axis === 'vertical' ? faChevronCircleRight : undefined}
              color="primary"
              width="100%"
              iconPosition="rightAbsolute"
            />
          </A>
        </li>
      )}
    </ul>
  );
};
