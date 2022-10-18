import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { debounce } from 'lodash-es';
import { Icon } from 'components/atoms/Icon';
import { Spacer } from 'components/atoms/Spacer';
import { ColorRadio } from 'components/molecules/ColorRadio';
import { ColorImagesFragment } from 'graphql/generated/codegen-client';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  colorImages: readonly ColorImagesFragment[];
};

export const ColorImageViewer: FC<Props> = ({ colorImages }) => {
  const [color, setColor] = useState<ColorImagesFragment>(colorImages[0]);

  const selectColor = useCallback((color: ColorImagesFragment) => {
    setColor(color);
    setSelectedImageIndex(0);
  }, []);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const imageUrls = useMemo(() => color.imageUrls, [color]);
  const imagesRef = useRef<HTMLUListElement>(null);

  const culcImageIndex = useCallback(
    debounce(() => {
      console.log('culcImageIndex');
      setSelectedImageIndex(
        (imagesRef?.current?.scrollLeft &&
          imagesRef?.current?.clientWidth &&
          Math.round(imagesRef?.current?.scrollLeft / imagesRef?.current?.clientWidth)) ??
          0
      );
    }, 180),
    []
  );

  useEffect(() => {
    console.log('useEffect');

    imagesRef?.current?.addEventListener('scroll', culcImageIndex);

    return () => {
      console.log('useEffectEnd');
      imagesRef?.current?.removeEventListener('scroll', culcImageIndex);
    };
  }, [culcImageIndex, imagesRef]);

  const scrollToIndex = (index: number) => {
    console.log('scrollToIndex');

    if (index === selectedImageIndex) {
      return;
    }

    imagesRef.current?.children
      ?.item(index)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    setSelectedImageIndex(index);
  };

  const scrollToNext = () => {
    console.log('scrollToNext');
    selectedImageIndex < imageUrls.length - 1 && scrollToIndex(selectedImageIndex + 1);
  };

  const scrollToPrev = () => {
    console.log('scrollToPrev');
    selectedImageIndex > 0 && scrollToIndex(selectedImageIndex - 1);
  };

  const styles = getStyles(useTheme());

  return (
    <div>
      <AspectRatio ratio={4 / 3}>
        <ul ref={imagesRef} className={styles.images}>
          {imageUrls.map((i, index) => (
            <li key={index}>
              <Image src={i} layout="fill" objectFit="cover" alt="" />
            </li>
          ))}
        </ul>
      </AspectRatio>
      <div className={styles.imageIndicator}>
        <span className={styles.imageIndicatorArrow} onClick={scrollToPrev}>
          <Icon icon={faChevronLeft}></Icon>
        </span>
        <ul className={styles.imageIndicatorItems}>
          {imageUrls.map((i, index) => (
            <li
              key={index}
              className={styles.imageIndicatorItem(index === selectedImageIndex)}
              onClick={() => scrollToIndex(index)}
            ></li>
          ))}
        </ul>
        <span className={styles.imageIndicatorArrow} onClick={scrollToNext}>
          <Icon icon={faChevronRight}></Icon>
        </span>
      </div>
      <Spacer size={$spacing.sm} />
      <ColorRadio<ColorImagesFragment>
        value={color}
        options={colorImages ?? []}
        idKey="colorId"
        colorKey="colorCode"
        large
        onChange={selectColor}
      ></ColorRadio>
    </div>
  );
};

const getStyles = (theme: Theme) => ({
  images: css`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;

    > li {
      scroll-snap-align: start;
      position: relative;
      display: block;
      flex: 0 0 100%;
      width: 100%;
      height: 100%;
    }
  `,
  imageIndicator: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  `,
  imageIndicatorItems: css`
    display: flex;
    flex: 1;
    gap: ${$spacing.sm};
    align-items: center;
    justify-content: center;
    width: 100%;
  `,
  imageIndicatorItem: (selected: boolean) =>
    css`
      display: inline-flex;
      width: 12px;
      height: 12px;
      cursor: pointer;
      background-color: ${selected ? theme.border : theme.background};
      border: 1px solid ${theme.border};
      border-radius: 50%;

      &:hover {
        background-color: ${selected ? theme.border : theme.backgroundHover};
      }

      ${mediaGreaterThan('md')} {
        width: 16px;
        height: 16px;
      }
    `,
  imageIndicatorArrow: css`
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    cursor: pointer;
    border-radius: 2px;

    &:hover {
      background-color: ${theme.backgroundHover};
    }
  `,
});
