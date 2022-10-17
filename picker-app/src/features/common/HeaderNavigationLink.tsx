import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { Theme, useTheme } from '@emotion/react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { A } from 'components/atoms/A';
import { Icon } from 'components/atoms/Icon';
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
          <A href={l.href}>
            <Icon icon={faChevronRight}></Icon>
            <span>{l.label}</span>
          </A>
        </li>
      ))}
    </ul>
  );
};

const getStyles = (theme: Theme) => ({
  links: css`
    margin-left: -${$spacing.md};

    a {
      display: flex;
      align-items: center;
      padding: ${$spacing.sm} ${$spacing.md};
      font-size: 14px;
      font-weight: 400;
      border-radius: 2px;
      transition: margin-left ease-in 200ms, background-color ease-in 200ms;

      > * + * {
        margin-left: ${$spacing.md};
      }

      :hover {
        margin-left: ${$spacing.md};
        background-color: ${theme.inverseHover};
      }
    }
  `,
});
