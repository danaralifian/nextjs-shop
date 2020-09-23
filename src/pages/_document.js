// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from "@material-ui/styles"

class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name='Description'
            content='Solusi terbaik belanja Anda'
          />
          <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
          <link rel="shortcut icon" href={require("~/public/assets/img/shop-favicon.png")} />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href={'~/public/assets/img/shop-favicon.png"'}
          />
          <meta name="theme-color" content="#ff8c25" />
          {/* <link rel="manifest" href="/static/public/site.webmanifest.json" /> */}
          {/* <link rel="manifest" href="/public/manifest.json"></link> */}

          <meta name='apple-mobile-web-app-title' content='MeShop' />
          <meta name='application-name' content='MeShop' />
          <meta property="og:type" content={"website"}></meta>
          <meta property="og:url" content={"https://demo1.danar.site/"}></meta>
          <meta property="og:title" content='MeShop'></meta>
          <meta property="og:description" content='Solusi terbaik belanja Anda'></meta>
  
          <meta property="twitter:card" content="summary_large_image"></meta>
          <meta property="twitter:url" content={"https://demo1.danar.site/"}></meta>
          <meta property="twitter:title" content='MeShop'></meta>
          <meta property="twitter:description" content='Solusi terbaik belanja Anda'></meta>
          <link href="https://fonts.googleapis.com/css2?family=Exo:ital@1&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,500;0,700;1,500&display=swap" rel="stylesheet"></link>
        </Head>
        <body style={{backgroundColor : '#fff'}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ]
  };
};

export default MyDocument
