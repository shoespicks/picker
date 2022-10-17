import { ElementType, type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $headerSize, $sideColumnWidth, Size } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  as?: ElementType;
  leftColumnElement?: JSX.Element;
  rightColumnElement?: JSX.Element;
  sideColumnWidth?: string;
  sticky?: boolean;
  stickyTop?: Size;
};

export const MultiColumn: FC<PropsWithChildren<Props>> = ({
  as: CustomTag = 'section',
  leftColumnElement,
  rightColumnElement,
  sideColumnWidth = $sideColumnWidth,
  sticky,
  stickyTop,
  children,
}) => {
  return (
    <div
      className={cx(
        styles.multiColumn,
        css`
          grid-template-columns: ${leftColumnElement ? sideColumnWidth : undefined} 1fr ${rightColumnElement
              ? sideColumnWidth
              : undefined};
        `
      )}
    >
      {leftColumnElement && columnContent(leftColumnElement, sticky, stickyTop)}

      <CustomTag
        className={css`
          width: 100%;
        `}
      >
        {children}
      </CustomTag>

      {rightColumnElement && columnContent(rightColumnElement, sticky, stickyTop)}
    </div>
  );
};

const columnContent = (element: JSX.Element, stickey?: boolean, stickyTop?: Size) => (
  <aside className={styles.sideColumn}>
    {stickey ? <div className={styles.stickyContainer(stickyTop)}>{element}</div> : element}
  </aside>
);

const styles = {
  multiColumn: css`
    display: grid;
    column-gap: ${$spacing.md};

    ${mediaGreaterThan('xl')} {
      column-gap: ${$spacing.lg};
    }
  `,
  sideColumn: css`
    display: block;
  `,
  stickyContainer: (top: Size = $headerSize) => css`
    position: sticky;
    top: ${top};
  `,
};
