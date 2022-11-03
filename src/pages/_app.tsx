import * as React from 'react'
import type { NextPage } from 'next'
import type { AppType, AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import { DefaultLayout } from '../components/DefaultLayout'
import { trpc } from '../utils/trpc'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from './config/Theme'
import createEmotionCache from './config/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}

const MyApp = (props: AppPropsWithLayout) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </CacheProvider>
  ) as any
}
export default trpc.withTRPC(MyApp)
