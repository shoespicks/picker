import { FC } from "react";
import { css } from "@emotion/css";
import { Theme, useTheme } from "@emotion/react";
import { BreadcrumbJsonLd } from "next-seo";

export const Breadcrumbs: FC = () => {
    const theme = useTheme();
    const styles = getStyles(theme);
  
    return (
  <>
    <h1 className={styles.hoge}>Breadcrumb JSON-LD</h1>
    <BreadcrumbJsonLd
      itemListElements={[
        {
          position: 1,
          name: 'Books',
          item: 'https://example.com/books',
        },
        {
          position: 2,
          name: 'Authors',
          item: 'https://example.com/books/authors',
        },
        {
          position: 3,
          name: 'Ann Leckie',
          item: 'https://example.com/books/authors/annleckie',
        },
        {
          position: 4,
          name: 'Ancillary Justice',
          item: 'https://example.com/books/authors/ancillaryjustice',
        },
      ]}
    />
  </>)
};


const getStyles = (theme: Theme) => ({
    hoge: css`
      color: ${theme.textInverse};
    `,
  });
  