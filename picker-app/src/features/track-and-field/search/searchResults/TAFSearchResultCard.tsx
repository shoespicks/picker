import React, { type FC, useState } from 'react';
import Image from 'next/image';
import { css, cx } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { shoeEnviroments } from 'picker-types/types/track-and-field/shoeEnviroment';
import { BarRating } from 'component/atoms/BarRating';
import { Card } from 'component/atoms/Card';
import { Divider } from 'component/atoms/Divider';
import { IconText } from 'component/atoms/IconText';
import { Spacer } from 'component/atoms/Spacer';
import { H5 } from 'component/atoms/Typography';
import { ColorSelect } from 'component/molecules/ColorRadio';
import { ItafShoeColorImages, SpikeBaseFragment } from 'graphql/generated/codegen-client';
import { $common } from 'shared/constants/styles/common';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  value: SpikeBaseFragment;
  className?: string;
};

export const TAFSearchResultCard: FC<Props> = ({ value, className }) => {
  const { brand, name, events, colorImages } = value;
  const [color, setColor] = useState<ItafShoeColorImages>(colorImages[0]);

  const styles = getStyles(useTheme());

  return (
    <>
      <Card padding={$spacing.md} className={cx(styles.host, className)}>
        <div>
          <span className={cx($common.truncate, styles.brandName)}>{brand}</span>
          <Spacer size={$spacing.xs}></Spacer>
          <H5 className={$common.truncate}>{name}</H5>
          {events?.length && (
            <div className={cx($common.truncate, styles.events)}>
              <span>{events.map(e => e.label).join(', ')}</span>
            </div>
          )}
        </div>
        <Spacer size={$spacing.sm}></Spacer>
        <div
          className={css`
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: ${$spacing.md};
          `}
        >
          <div
            className={css`
              > * + * {
                margin-top: ${$spacing.sm};
              }
            `}
          >
            <AspectRatio ratio={1}>
              <Image src={color.imageUrls[0]} layout="fill" objectFit="contain" alt="" />
            </AspectRatio>
            <ColorSelect<ItafShoeColorImages>
              value={color}
              options={colorImages ?? []}
              idKey="colorId"
              colorKey="colorCode"
              onChange={setColor}
            ></ColorSelect>
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
              <span
                className={css`
                  font-weight: bold;
                `}
              >
                ¥{value.price}
              </span>
              <div
                className={css`
                  display: inline-flex;
                  gap: ${$spacing.sm};
                  align-items: center;
                  height: 18px;
                  font-size: 14px;
                `}
              >
                <IconText icon={faWeightScale} size="sm" text={value.weight + 'g'}></IconText>
                <Divider orientation="vertical"></Divider>
                <span>{value.allWeatherOnly ? shoeEnviroments.allweatherOnly.label : shoeEnviroments.soil.label}</span>
              </div>
            </div>
            <Spacer size={$spacing.sm}></Spacer>
            <ul>
              <li className={styles.paramaterScore}>
                <span>軽さ</span>
                <div className={styles.paramaterScoreBarContainer}>
                  <BarRating value={value.lightnessScore ?? 0}></BarRating>
                </div>
              </li>
              <li className={styles.paramaterScore}>
                <span>広さ</span>
                <div className={styles.paramaterScoreBarContainer}>
                  <BarRating value={value.widthScore ?? 0}></BarRating>
                </div>
              </li>
              <li className={styles.paramaterScore}>
                <span>反り</span>
                <div className={styles.paramaterScoreBarContainer}>
                  <BarRating value={value.angleScore ?? 0}></BarRating>
                </div>
              </li>
              <li className={styles.paramaterScore}>
                <span>グリップ力</span>
                <div className={styles.paramaterScoreBarContainer}>
                  <BarRating value={value.gripScore ?? 0}></BarRating>
                </div>
              </li>
              <li className={styles.paramaterScore}>
                <span>反発性</span>
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
  brandName: css`
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: ${theme.textGray};
    text-transform: uppercase;
  `,
  events: css`
    display: block;
    font-size: 12px;
    color: ${theme.textGray};
    text-transform: uppercase;
  `,
  paramaterScore: css`
    display: grid;
    grid-template-columns: 90px 1fr;
    grid-gap: ${$spacing.md};
  `,
  paramaterScoreBarContainer: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
});
