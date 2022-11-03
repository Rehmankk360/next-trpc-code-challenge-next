import { Code, Heading, Text } from '@chakra-ui/react'
import { Box, Button, Chip, Paper, Typography } from '@mui/material'
import NextError from 'next/error'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '~/pages/_app'
import { trpc } from '~/utils/trpc'

const PostViewPage: NextPageWithLayout = () => {
  const id = Number(useRouter().query.id)
  const postQuery = trpc.post.byId.useQuery({ id })

  if (postQuery.error) {
    return (
      <NextError
        title={postQuery.error.message}
        statusCode={postQuery.error.data?.httpStatus ?? 500}
      />
    )
  }

  if (postQuery.status !== 'success') {
    return <>Loading...</>
  }
  const { data } = postQuery
  return (
    <>
      {/* <Heading>{data.title}</Heading>
      <em>Created {data.createdAt.toLocaleDateString('en-us')}</em>

      <Text>{data.text}</Text>

      <h2>Raw data:</h2>
      <Code>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </Code> */}
      <Paper elevation={5} sx={{ p: 4, maxWidth: 700 }}>
        <Box
          display="flex"
          justifyContent={'space-between'}
          alignItems="center"
          sx={{ mb: 5 }}
        >
          <Typography variant="h4">{data.title}</Typography>
          <Button variant="contained">Edit</Button>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ mb: 5 }}>
            {data.text}
          </Typography>
          <Box display="flex" alignItems={'center'} gap={2}>
            <Typography variant="h6">Tags: </Typography>
            {data.tags?.length
              ? data.tags.map((tag) => (
                  <Chip label={tag.label} variant="outlined" />
                ))
              : 'No Tags Attached'}
          </Box>
        </Box>
      </Paper>
    </>
  )
}

export default PostViewPage
