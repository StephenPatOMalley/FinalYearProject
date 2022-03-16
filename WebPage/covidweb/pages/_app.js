import '../styles/globals.css'
import Layout from '../page_components/Layout/Layout'
import { NextUIProvider } from "@nextui-org/react";
import { DataContextProvider } from '../store/data-store'

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <DataContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataContextProvider>
    </NextUIProvider>
  );
}

export default MyApp
