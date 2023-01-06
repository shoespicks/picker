import { type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import * as RadixAvatar from '@radix-ui/react-avatar';

type Props = {
  imageUrl?: string;

  /**
   * 画像が読み込めないとき名前の一文字目だけ出す用
   */
  fallbackName?: string;
};

export const Avatar: FC<Props> = ({ imageUrl, fallbackName }) => {
  const styles = getStyles(useTheme());

  return (
    <RadixAvatar.Root className={styles.root}>
      <RadixAvatar.Image className={styles.image} src={imageUrl ?? undefined} alt="userImage" />
      <RadixAvatar.Fallback className="AvatarFallback" delayMs={600}>
        {fallbackName?.charAt(0)}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

const getStyles = (theme: Theme) => ({
  root: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    overflow: hidden;
    vertical-align: middle;
    user-select: none;
    background-color: ${theme.background};
    border-radius: 100%;
  `,
  image: css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  `,
});
