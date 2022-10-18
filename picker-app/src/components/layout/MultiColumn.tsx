import { ElementType, type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { BreakpointCode, mediaGreaterThan } from 'shared/constants/styles/media-query';
import { $sideColumnWidth } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  as?: ElementType;
  leftColumnElement?: JSX.Element;
  rightColumnElement?: JSX.Element;
  sideColumnWidth?: string;
  stickyTop?: string;
  breakPoint?: BreakpointCode;
};

export const MultiColumn: FC<PropsWithChildren<Props>> = ({
  as: CustomTag = 'section',
  leftColumnElement,
  rightColumnElement,
  sideColumnWidth = $sideColumnWidth,
  stickyTop,
  breakPoint = 'md',
  children,
}) => {
  return (
    <div
      className={cx(
        styles.multiColumn,
        css`
          grid-template-columns: 1fr;
          ${mediaGreaterThan(breakPoint)} {
            grid-template-columns: ${leftColumnElement ? sideColumnWidth : undefined} 1fr ${rightColumnElement
                ? sideColumnWidth
                : undefined};
          }
        `
      )}
    >
      {leftColumnElement && columnContent(leftColumnElement, stickyTop)}

      <CustomTag
        className={css`
          min-width: 100%;
        `}
      >
        {children}
      </CustomTag>

      {rightColumnElement && columnContent(rightColumnElement, stickyTop)}
    </div>
  );
};

const columnContent = (element: JSX.Element, stickyTop?: string) => (
  <aside>{stickyTop ? <div className={styles.stickyContainer(stickyTop)}>{element}</div> : element}</aside>
);

const styles = {
  multiColumn: css`
    display: grid;
    gap: ${$spacing.md};

    ${mediaGreaterThan('xl')} {
      gap: ${$spacing.lg};
    }
  `,
  stickyContainer: (top?: string) => css`
    position: sticky;
    top: ${top};
  `,
};
