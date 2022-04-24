// https://nextjs.org/docs/advanced-features/custom-document
import document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends document {
  static async getInitialProps(ctx) {
    const initialProps = await document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;