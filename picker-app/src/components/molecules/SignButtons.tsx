import React, { FC } from 'react';
import { css } from '@emotion/css';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { A } from 'components/atoms/A';
import { Button } from 'components/atoms/Button';
import { $spacing } from 'shared/constants/styles/spacing';

export const SignButtons: FC = () => {
  const styles = getStyles();

  return (
    <ul className={styles.buttons}>
      <li>
        <A href="/track-and-field#11">
          <Button
            label="ログイン"
            icon={faChevronCircleRight}
            iconPosition="right"
            width="100%"
            fontSize="14px"
          ></Button>
        </A>
      </li>
      <li>
        <A href="/track-and-field#12">
          <Button
            label="無料会員登録"
            icon={faChevronCircleRight}
            iconPosition="right"
            width="100%"
            fontSize="14px"
          ></Button>
        </A>
      </li>
    </ul>
  );
};

const getStyles = () => ({
  buttons: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${$spacing.sm};
  `,
  button: css`
    font-size: 14px;
  `,
});
