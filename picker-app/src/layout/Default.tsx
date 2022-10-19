import { PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { Theme, ThemeProvider } from '@emotion/react';
import { Footer } from 'features/common/footer';
import { homeTheme } from 'shared/constants/styles/colors';

type Props = {
  theme?: Theme;
  headerElement?: JSX.Element;
};

const DefaultLayout = ({ children, theme = homeTheme, headerElement }: PropsWithChildren<Props>) => {
  const styles = getStyles(theme);
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.mainContainer}>
        {headerElement}
        <main>{children}</main>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

const getStyles = (theme: Theme) => ({
  mainContainer: css`
    width: 100%;
    min-height: 100vh;
    color: ${theme.text['default']};
  `,
});

export default DefaultLayout;
