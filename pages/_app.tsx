import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return <div>
    <Layout></Layout>
    <Component className="min-h-screen" {...pageProps} />
    </div>
}

export default MyApp
