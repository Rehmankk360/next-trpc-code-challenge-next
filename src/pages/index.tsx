import { trpc } from '../utils/trpc'
import { NextPageWithLayout } from './_app'
import { inferProcedureInput } from '@trpc/server'

import { Fragment } from 'react'
import type { AppRouter } from '~/server/routers/_app'
import { Box, Divider, Flex, Input, Textarea } from '@chakra-ui/react'
import { Link } from '~/components/Link'
import { useRouter } from 'next/router'

import { Button, Typography } from '@mui/material'

const IndexPage: NextPageWithLayout = () => {
  const utils = trpc.useContext()
  const postsQuery = trpc.post.list.useInfiniteQuery({ limit: 10 })

  return (
    <>
      <Typography variant={'h4'} sx={{ mb: 3 }}>
        Simple blog
      </Typography>
      <Box
        display={'flex'}
        justifyContent="space-between"
        alignItems={'center'}
        mb={15}
      >
        <Box display="flex">
          <Button
            onClick={() => postsQuery.fetchPreviousPage()}
            disabled={
              !postsQuery.hasPreviousPage || postsQuery.isFetchingPreviousPage
            }
            variant="contained"
            sx={{ mr: 2 }}
          >
            {postsQuery.isFetchingPreviousPage
              ? 'Loading more...'
              : postsQuery.hasPreviousPage
              ? 'Load More'
              : 'Nothing more to load'}
          </Button>
          <Typography variant={'h5'}>
            {postsQuery.data?.pages.length}{' '}
            {postsQuery.data?.pages.length === 1 ? 'page' : 'pages'} loaded
            {postsQuery.status === 'loading' && '(loading)'}
          </Typography>
        </Box>

        <Link href={`/add-post`} ml="auto">
          <Button variant="outlined">Add a post</Button>
        </Link>
      </Box>

      {postsQuery.data?.pages.map((page, index) => (
        <Fragment key={page.items[0]?.id || index}>
          {page.items.map((item: any) => (
            <article key={item.id}>
              <Box
                p={20}
                backgroundColor="teal"
                display={'flex'}
                justifyContent="space-between"
                alignItems={'center'}
                mb={20}
                borderRadius={10}
              >
                <Typography variant="h5" color="#fff">
                  {item.title}
                </Typography>

                <Link href={`/post/${item.id}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ color: '#fff' }}
                  >
                    View more
                  </Button>
                </Link>
              </Box>
            </article>
          ))}
        </Fragment>
      ))}
    </>
  )
}

export default IndexPage
