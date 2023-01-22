import React, { type FC, useState } from 'react';
import Image from 'next/image';
import { css, cx } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { shoeEnviroments } from 'picker-types/types/track-and-field/shoeEnviroment';
import { BarRating } from 'components/atoms/BarRating';
import { Card } from 'components/atoms/Card';
import { Divider } from 'components/atoms/Divider';
import { IconText } from 'components/atoms/IconText';
import { Ratio } from 'components/atoms/Ratio';
import { Spacer } from 'components/atoms/Spacer';
import { H5, Small, Strong } from 'components/atoms/Typography';
import { ColorRadio } from 'components/molecules/ColorRadio';
import { $common } from 'shared/constants/styles/common';
import { $spacing } from 'shared/constants/styles/spacing';
import { ColorImagesFragment, SpikeBaseFragment } from '../api/graphql/generated/codegen-client';

type Props = {
  value: SpikeBaseFragment;
  className?: string;
  onClick?(value: SpikeBaseFragment): void;
};

export const TAFSearchResultCard: FC<Props> = ({ value, className, onClick }) => {
  const { brand, name, events, colorImages } = value;
  const [color, setColor] = useState<ColorImagesFragment>(colorImages[0]);

  const styles = getStyles(useTheme());
  const handleClick = () => {
    onClick && onClick(value);
  };

  return (
    <>
      <Card padding={$spacing.md} className={cx(styles.host, className)} clickable onClick={handleClick}>
        <div>
          <Small
            color="dark"
            loud
            upperCase
            truncate
            className={css`
              display: block;
            `}
          >
            {brand}
          </Small>
          <Spacer size={$spacing.xs}></Spacer>
          <H5 truncate>{name}</H5>
          {events?.length && (
            <div className={cx($common.truncate, styles.events)}>
              <Small color="dark" loud upperCase truncate>
                {events.map(e => e.label).join(', ')}
              </Small>
            </div>
          )}
        </div>
        <Spacer size={$spacing.sm}></Spacer>
        <div
          className={css`
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: ${$spacing.lg};
          `}
        >
          <div
            className={css`
              > * + * {
                margin-top: ${$spacing.sm};
              }
            `}
          >
            <Ratio ratio={4 / 3}>
              <Image src={color.imageUrls[0]} fill sizes="width: 100%" alt="" />
            </Ratio>
            <ColorRadio<ColorImagesFragment>
              value={color}
              options={colorImages ?? []}
              idKey="colorId"
              colorKey="colorCode"
              onChange={setColor}
            ></ColorRadio>
          </div>
          <div>
            <div
              className={css`
                display: flex;
                flex-wrap: wrap;
                gap: ${$spacing.xs};
                align-items: center;
                justify-content: space-between;
              `}
            >
              <Strong loud>¥{value.price?.toLocaleString()}</Strong>
              <div
                className={css`
                  display: inline-flex;
                  gap: ${$spacing.sm};
                  align-items: center;
                  height: 18px;
                  font-size: 14px;
                `}
              >
                <IconText icon={faWeightScale} size="sm" text={value.weight + 'g'} fontSize="12px"></IconText>
                <Divider orientation="vertical"></Divider>
                <Small>
                  {value.allWeatherOnly ? shoeEnviroments.allweatherOnly.label : shoeEnviroments.soil.label}
                </Small>
              </div>
            </div>
            <Spacer size={$spacing.sm}></Spacer>
            <ul className={styles.paramaterScores}>
              <li>
                <Small>軽さ</Small>
                <div className={styles.paramaterScoreBarContainer}>
                  <BarRating value={value.lightnessScore ?? 0}></BarRating>
                </div>
              </li>
              <li>
                <Small>広さ</Small>
                <div className={styles.paramaterScoreBarContainer}>
                  <BarRating value={value.widthScore ?? 0}></BarRating>
                </div>
              </li>
              <li>
                <Small>反り</Small>
                <div className={styles.paramaterScoreBarContainer}>
                  <BarRating value={value.angleScore ?? 0}></BarRating>
                </div>
              </li>
              <li>
                <Small>グリップ力</Small>
                <div className={styles.paramaterScoreBarContainer}>
                  <BarRating value={value.gripScore ?? 0}></BarRating>
                </div>
              </li>
              <li>
                <Small>反発性</Small>
                <div className={styles.paramaterScoreBarContainer}>
                  <BarRating value={value.hardnessScore ?? 0}></BarRating>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
};

const getStyles = (theme: Theme) => ({
  host: css`
    display: block;
  `,
  events: css`
    display: block;
    font-size: 12px;
    color: ${theme.textDark};
    text-transform: uppercase;
  `,
  paramaterScores: css`
    > li {
      display: grid;
      grid-template-columns: 56px 1fr;
      grid-gap: ${$spacing.md};

      + li {
        margin-top: ${$spacing.xs};
      }
    }
  `,
  paramaterScoreBarContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
});
