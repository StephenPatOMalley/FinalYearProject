//NextJS tutorial https://www.youtube.com/watch?v=MFuwkrseXVE&t=8092s
// https://nextjs.org/docs/advanced-features/custom-app
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../components/layout/LayoutFormat'
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
