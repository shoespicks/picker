import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { ScrollArea } from 'components/atoms/ScrollArea';
import { LinkCard } from 'components/molecules/LinkCard';
import { TAF_SEARCH_PAGE_PATH } from 'features/track-and-field/constants/routing';
import { ISpikeBase } from 'graphql/generated/codegen-client';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  spikes: readonly ISpikeBase[];
};

export const TAFSpikeCardCarousel: FC<Props> = ({ spikes }) => {
  return (
    <>
      <ScrollArea padding={`0 0 ${$spacing.lg}`} always>
        <ul
          className={css`
            display: flex;
            gap: ${$spacing.sm};
          `}
        >
          {spikes.map(s => {
            return (
              <li key={s.id}>
                <LinkCard
                  href={`${TAF_SEARCH_PAGE_PATH}/${s.id}`}
                  title={s.name}
                  imageUrl={s.colorImages?.[0]?.imageUrls?.[0]}
                  caption={s.brand}
                  description={(s?.price && `¥${s.price}（税込）`) || undefined}
                ></LinkCard>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </>
  );
};
