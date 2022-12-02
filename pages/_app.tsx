import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../config/theme';
import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return <div>
    <Layout></Layout>
    <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component className="min-h-screen" {...pageProps} />
    </ThemeProvider>
    </div>
}

export default MyApp
