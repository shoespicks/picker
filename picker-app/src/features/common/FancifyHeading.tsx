import { type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { Circle } from 'components/atoms/Circle';
import { H2, Span } from 'components/atoms/Typography';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  text?: string;
  circleText?: string;
};

export const FancifyHeading: FC<Props> = ({ text, circleText }) => {
  const styles = getStyles(useTheme());

  return (
    <div className={styles.root}>
      <Circle>
        <Span fontSize="20px" loud>
          {circleText}
        </Span>
      </Circle>
      <H2>{text}</H2>
    </div>
  );
};
const getStyles = (theme: Theme) => ({
  root: css`
    display: flex;
    gap: ${$spacing.md};
    align-items: center;
  `,
});
