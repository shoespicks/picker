import React, { FC } from 'react';
import Image from 'next/image';
import { css } from '@emotion/css';
import { AricleItemFragment } from 'api/graphql/generated/codegen-client';
import { Ratio } from 'components/atoms/Ratio';
import { Section } from 'components/atoms/Section';
import { Spacer } from 'components/atoms/Spacer';
import { H4, Pre } from 'components/atoms/Typography';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  articles: readonly AricleItemFragment[];
};

export const Articles: FC<Props> = ({ articles }) => {
  return (
    <article className={styles.articles}>
      {articles.map((a, index) => (
        <Section key={index} className={styles.section(a.imageUrls?.length)}>
          <div>
            {a.title && <H4>{a.title}</H4>}
            {a.title && (
              <>
                <Spacer size={$spacing.md}></Spacer>
                <Pre>{a.description}</Pre>
              </>
            )}
          </div>
          {!!a.imageUrls?.length && (
            <div className={styles.sectionImages(a.imageUrls.length)}>
              {a.imageUrls?.map(i => (
                <Ratio
                  key={i}
                  ratio={4 / 3}
                  className={css`
                    height: auto;
                  `}
                >
                  <Image
                    src={i}
                    fill
                    sizes="width: 100%"
                    className={css`
                      object-fit: contain;
                      object-position: top;
                    `}
                    alt="image"
                  ></Image>
                </Ratio>
              ))}
            </div>
          )}
        </Section>
      ))}
    </article>
  );
};

const styles = {
  articles: css`
    display: block;

    > * + * {
      margin-top: ${$spacing['2xl']};
    }
  `,
  section: (imageCount?: number) => css`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${$spacing.lg};

    > * {
      max-width: 100%;
    }

    ${mediaGreaterThan('lg')} {
      grid-template-columns: 1fr ${imageCount === 1 && '1fr'};
    }
  `,
  sectionImages: (imageCount?: number) => css`
    display: grid;
    grid-template-columns: repeat(${imageCount}, 1fr);
    gap: ${$spacing.sm};
  `,
};
