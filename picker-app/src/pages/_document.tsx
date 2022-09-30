import React from 'react';
import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import { cache } from '@emotion/css';
import createEmotionServer from '@emotion/server/create-instance';

// See https://emotion.sh/docs/ssr#nextjs
export const renderStatic = async (html: string) => {
  if (html === undefined) {
    throw new Error('did you forget to return html from renderToString?');
  }
  const { extractCritical } = createEmotionServer(cache);
  const { ids, css } = extractCritical(html);

  return { html, ids, css };
};

class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    const { css, ids } = await renderStatic(initialProps.html);
    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          {initialProps.styles}
          <style data-emotion={`css ${ids.join(' ')}`} dangerouslySetInnerHTML={{ __html: css }} />
        </React.Fragment>
      ),
    };
  }
}

export default _Document;
