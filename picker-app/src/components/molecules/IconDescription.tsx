import React, { type FC } from 'react';
import { css } from '@emotion/css';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Icon } from 'components/atoms/Icon';
import { Spacer } from 'components/atoms/Spacer';
import { Pre, Strong } from 'components/atoms/Typography';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  icon?: IconDefinition;
  title?: string;
  description?: string;
};

export const IconDescription: FC<Props> = ({ icon, title, description }) => (
  <div
    className={css`
      display: grid;
      grid-template-columns: 30px 1fr;
      gap: ${$spacing.sm};

      & + & {
        margin-top: ${$spacing.md};
      }
    `}
  >
    {icon && (
      <div
        className={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Icon icon={icon} size="xl"></Icon>
      </div>
    )}
    <div>
      {title && (
        <>
          <Strong>{title}</Strong>
        </>
      )}
      {description && (
        <>
          <Spacer size={$spacing.sm} />
          <Pre fontSize="14px">{description}</Pre>
        </>
      )}
    </div>
  </div>
);
