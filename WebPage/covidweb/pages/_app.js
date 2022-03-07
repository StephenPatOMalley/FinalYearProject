import Layout from '../page_components/Layout/Layout'
import '../styles/globals.css'
import { NextUIProvider } from "@nextui-org/react";
import { DataContextProvider } from '../store/data-store'

function MyApp({ Component, pageProps }) {
  return (
    <DataContextProvider>
     <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </DataContextProvider>
  );
}

export default MyApp
