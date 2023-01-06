import React, { type FC } from 'react';
import { css, cx } from '@emotion/css';
import { faTwitter, faGoogle, faLine } from '@fortawesome/free-brands-svg-icons';
import { signIn } from 'next-auth/react';
import { Button } from 'components/atoms/Button';
import { Section } from 'components/atoms/Section';
import { Spacer } from 'components/atoms/Spacer';
import { H4 } from 'components/atoms/Typography';
import { $spacing } from 'shared/constants/styles/spacing';

const styles = {
  horizontal: css`
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${$spacing.xs};
  `,
  vertical: css`
    grid-template-columns: 1fr;
    gap: ${$spacing.md};
  `,
};

type Props = {
  callbackUrl?: string;
  axis?: 'vertical' | 'horizontal';
};
export const LoginLauncher: FC<Props> = ({ axis = 'horizontal', callbackUrl }) => {
  const signInOption = {
    callbackUrl: callbackUrl,
  };

  return (
    <Section>
      <H4>ソーシャルアカウントでログイン</H4>
      <Spacer size={$spacing.sm} />
      <ul
        className={cx(
          css`
            display: grid;
          `,
          {
            [styles.horizontal]: axis === 'horizontal',
            [styles.vertical]: axis === 'vertical',
          }
        )}
      >
        <li>
          <Button
            label="Google"
            icon={faGoogle}
            iconPosition="leftInline"
            width="100%"
            fontSize="14px"
            onClick={() => signIn('google', signInOption)}
          ></Button>
        </li>
        <li>
          <Button
            label="LINE"
            icon={faLine}
            iconPosition="leftInline"
            width="100%"
            fontSize="14px"
            onClick={() => signIn('line', signInOption)}
          ></Button>
        </li>
        <li>
          <Button
            label="Twitter"
            icon={faTwitter}
            iconPosition="leftInline"
            width="100%"
            fontSize="14px"
            onClick={() => signIn('twitter', signInOption)}
          ></Button>
        </li>
      </ul>
    </Section>
  );
};
