import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { Card } from 'components/atoms/Card';
import { TAFTopTitleCard } from 'features/track-and-field/top/TAFTopTitleCard';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';

export const TAFTopHero: FC = () => (
  <Card height="600px" className={styles.topHeroCard}>
    {/* <video
      className={styles.heroVideo}
      src="/track-and-field/movies/hero-movie.mp4"
      poster="/track-and-field/images/hero-image.jpg"
      muted
      autoPlay
      playsInline
      loop
    ></video> */}
    <div className={styles.heroVideoFilter}></div>
    <TAFTopTitleCard className={styles.titleCard}></TAFTopTitleCard>
  </Card>
);

const styles = {
  topHeroCard: css`
    position: relative;
    overflow: hidden;
  `,
  heroVideo: css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1080px;
    min-width: 100%;
    min-height: 100%;
    filter: saturate(24%) blur(3px);
    transform: translate(-50%, -50%);

    ${mediaGreaterThan('lg')} {
      width: 1440px;
    }
  `,
  heroVideoFilter: css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgb(0 0 0 / 10%);
    background-image: radial-gradient(#111 30%, transparent 31%), radial-gradient(#111 30%, transparent 31%);
    background-repeat: repeat;
    background-position: 0 0, 2px 2px;
    background-size: 4px 4px;
  `,
  titleCard: css`
    position: absolute;
    bottom: 32px;
    left: 32px;
    width: 40%;
    min-width: 280px;

    ${mediaGreaterThan('lg')} {
      width: 30%;
    }

    ${mediaGreaterThan('xl')} {
      width: 25%;
    }
  `,
  searchWindow: css`
    position: absolute;
    top: 32px;
    right: 32px;
    padding: 16px 32px;
  `,
};
