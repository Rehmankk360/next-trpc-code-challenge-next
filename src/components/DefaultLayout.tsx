import { Box, Container } from '@mui/material'
import Head from 'next/head'
import { ReactNode } from 'react'

type DefaultLayoutProps = { children: ReactNode }

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container maxWidth={'lg'}>
          <Box mt={15}>{children}</Box>
        </Container>
      </main>
    </>
  )
}
