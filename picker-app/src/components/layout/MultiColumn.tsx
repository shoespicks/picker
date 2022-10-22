import { ElementType, type FC, PropsWithChildren } from 'react';
import { css, cx } from '@emotion/css';
import { BreakpointCode, mediaGreaterThan, visibleOverBreakPointStyle } from 'shared/constants/styles/media-query';
import { $sideColumnWidth } from 'shared/constants/styles/size';
import { $spacing } from 'shared/constants/styles/spacing';

type Props = {
  as?: ElementType;
  leftColumnElement?: JSX.Element;
  rightColumnElement?: JSX.Element;
  sideColumnWidth?: string;
  stickyTop?: string;
  breakPoint?: BreakpointCode;
  hideSideColumnInBreakPoint?: boolean; // Trueの場合、小さい画面ではの横カラムは消す
};

export const MultiColumn: FC<PropsWithChildren<Props>> = ({
  as: CustomTag = 'section',
  leftColumnElement,
  rightColumnElement,
  sideColumnWidth = $sideColumnWidth,
  stickyTop,
  breakPoint = 'md',
  hideSideColumnInBreakPoint = false,
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
      {leftColumnElement && columnContent(leftColumnElement, hideSideColumnInBreakPoint, breakPoint, stickyTop)}

      <CustomTag
        className={css`
          min-width: 100%;
        `}
      >
        {children}
      </CustomTag>

      {rightColumnElement && columnContent(rightColumnElement, hideSideColumnInBreakPoint, breakPoint, stickyTop)}
    </div>
  );
};

const columnContent = (
  element: JSX.Element,
  hideSideColumnInBreakPoint: boolean,
  breakPoint: BreakpointCode,
  stickyTop?: string
) => (
  <aside className={cx({ [visibleOverBreakPointStyle(breakPoint)]: hideSideColumnInBreakPoint })}>
    <div className={styles.stickyContainer(stickyTop)}>{element}</div>
  </aside>
);

const styles = {
  multiColumn: css`
    display: grid;
    gap: ${$spacing.lg};
  `,
  stickyContainer: (stickyTop?: string) =>
    css`
      position: ${stickyTop && 'stickey'};
      top: ${stickyTop};
    `,
};
