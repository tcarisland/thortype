import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/navbar'
import { SSRProvider } from 'react-bootstrap'

function MyApp({ Component, pageProps }: AppProps) {
  return <SSRProvider>
    <NavBar></NavBar>
    <Component {...pageProps} />
  </SSRProvider>
}

export default MyApp
