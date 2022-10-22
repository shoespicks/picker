import React, { type FC, Fragment } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { Divider } from 'components/atoms/Divider';
import { Strong } from 'components/atoms/Typography';
import { SpikeDetailSpecFragment } from 'graphql/generated/codegen-client';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  detailSpec: SpikeDetailSpecFragment;
};

export const TAFSpikeDetailSpec: FC<Props> = ({ detailSpec }) => {
  const styles = getStyles(useTheme());

  return (
    <>
      <Divider></Divider>
      <dl className={styles.detailSpec}>
        {(Object.keys(titleMap) as (keyof SpikeDetailSpecFragment)[]).flatMap(
          key =>
            detailSpec[key] && (
              <Fragment key={key}>
                <dt>
                  <Strong semiBold>{titleMap[key]}</Strong>
                </dt>
                <dd>{detailSpec[key]}</dd>
              </Fragment>
            )
        ) || []}
      </dl>
      <Divider></Divider>
    </>
  );
};

const titleMap: { [key in keyof SpikeDetailSpecFragment]: string } = {
  name: 'スパイク名',
  price: '価格',
  weight: '重さ',
  events: '対応種目',
  allWeatherOnly: '対応環境',
  pinDetail: 'スパイクピン',
  releaseYear: '発売年',
  madeIn: '生産国',
  shoeLaceType: '靴紐タイプ',
  upperMaterial: 'アッパー素材',
  soleMaterial: 'ソール素材',
  size: 'サイズ',
  athleteLevel: '競技レベル',
};

const getStyles = (theme: Theme) => ({
  detailSpec: css`
    display: grid;
    grid-template-columns: 160px 1fr;

    > * {
      padding: ${$spacing.md} 0;
    }

    dt {
      font-weight: 500;
    }

    dt ~ dt,
    dt ~ dd {
      border-top: 1px solid ${theme.lowBorder};
    }
  `,
});
