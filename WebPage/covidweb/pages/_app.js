import '../styles/globals.css'
import Layout from '../components/Layout/Layout'
import { NextUIProvider } from "@nextui-org/react";
import { CurrentDataContextProvider } from '../store/currentBMEData'
import { YesterdayDataContextProvider } from '../store/lastDayBMEData'

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <YesterdayDataContextProvider>
        <CurrentDataContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CurrentDataContextProvider>
      </YesterdayDataContextProvider>
    </NextUIProvider>
  );
}

export default MyApp
