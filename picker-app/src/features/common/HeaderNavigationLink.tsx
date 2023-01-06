import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { A } from 'components/atoms/A';
import { IconText } from 'components/atoms/IconText';
import { $spacing } from 'shared/constants/styles/spacing';
import { Link } from 'shared/constants/type';

type Props = {
  links: Link[];
};
export const HeaderNavigationLink: FC<Props> = ({ links }) => {
  const styles = getStyles(useTheme());

  return (
    <ul className={styles.links}>
      {links.map(l => (
        <li key={l.label}>
          <A href={l.href} className={styles.link}>
            <IconText icon={faChevronRight} text={l.label} gap="md" fontSize="16px"></IconText>
          </A>
        </li>
      ))}
    </ul>
  );
};

const getStyles = (theme: Theme) => ({
  links: css`
    margin-left: -${$spacing.md};
  `,
  link: css`
    display: flex;
    align-items: center;
    padding: ${$spacing.md} ${$spacing.md};
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    border-radius: 2px;
    transition: margin-left 200ms ease-in, background-color 200ms ease-in;

    > * + * {
      margin-left: ${$spacing.md};
    }

    :hover {
      margin-left: ${$spacing.md};
      background-color: ${theme.inverseOverlayHover};
    }
  `,
});
