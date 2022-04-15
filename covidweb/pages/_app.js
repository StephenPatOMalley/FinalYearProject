import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../components/layout/Layout'
import { NextUIProvider } from "@nextui-org/react"
import { DataContextProvider } from '../store/BME_Data'

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
