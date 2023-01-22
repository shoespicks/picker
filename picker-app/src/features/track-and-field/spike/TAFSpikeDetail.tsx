import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { IconName } from 'picker-types/types/track-and-field/icons';
import { SpikeFragment } from 'api/graphql/generated/codegen-client';
import { Divider } from 'components/atoms/Divider';
import { IconText } from 'components/atoms/IconText';
import { Radar } from 'components/atoms/Radar';
import { Spacer } from 'components/atoms/Spacer';
import { H2 } from 'components/atoms/Typography';
import { IconDescription } from 'components/molecules/IconDescription';
import { Articles } from 'components/organisms/Articles';
import { spikeIconMap } from 'features/track-and-field/constants/spikeIconMap';
import { TAFSpikeDetailSpec } from 'features/track-and-field/spike/TAFSpikeDetailSpec';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  spike: SpikeFragment;
};

export const TAFSpikeDetail: FC<Props> = ({ spike }) => {
  return (
    <>
      <div className={styles.spikeStrengthContainer}>
        <Radar
          data={[4, 3, 2, 4.5, 5]}
          labels={['軽さ', '    広さ', '   反り', 'グリップ力    ', '反発性    ']}
        ></Radar>
        {spike.strength?.length && (
          <ul className={styles.spikeStrength}>
            {spike.strength.map((s, index) => (
              <li key={index}>
                <IconDescription
                  icon={spikeIconMap[s.icon as IconName]}
                  title={s.label || ''}
                  description={s.description || ''}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {spike.detailSpec && (
        <>
          <Spacer size={$spacing['3xl']} />
          <TAFSpikeDetailSpec detailSpec={spike.detailSpec}></TAFSpikeDetailSpec>
        </>
      )}
      {spike.recommendedFor && (
        <>
          <Spacer size={$spacing.lg} />
          <IconDescription icon={faLightbulb} title="こんな人におすすめ" description={spike.recommendedFor} />
        </>
      )}

      {spike.keyFeature && (
        <>
          <Spacer size={$spacing['3xl']} />
          <H2>
            <IconText icon={faRectangleList} text="特徴" fontSize={'18px'} gap="md" />
          </H2>
          <Divider></Divider>
          <Spacer size={$spacing.lg} />
          <Articles articles={spike.keyFeature}></Articles>
        </>
      )}
    </>
  );
};

const styles = {
  spikeStrengthContainer: css`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${$spacing.lg};

    > * {
      max-width: 100%;
    }

    ${mediaGreaterThan('lg')} {
      grid-template-columns: repeat(2, 1fr);
    }
  `,
  spikeStrength: css`
    li + li {
      margin-top: ${$spacing.md};
    }
  `,
};
