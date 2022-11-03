import { trpc } from '../utils/trpc'
import { useRouter } from 'next/router'
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'

interface TagType {
  id: string
  label: string
}
interface PostType {
  title: string
  text: string
  tags: TagType[]
}

const AddPost = () => {
  const [post, setPost] = useState<PostType>({ title: '', text: '', tags: [] })
  const [error, setError] = useState({ title: '', text: '' })
  const [saved, setSaved] = useState(false)
  const utils = trpc.useContext()

  const tagsQuery = trpc.tag.list.useInfiniteQuery({ limit: 100 })

  const addPost = trpc.post.add.useMutation({
    async onSuccess() {
      await utils.post.list.invalidate()
    }
  })

  const tags = tagsQuery.data?.pages[0]?.items

  const checkValidation = () => {
    let errors = { title: '', text: '' }
    if (!post.title) {
      errors = { ...errors, title: 'Title cannot be empty' }
    }
    if (!post.text) {
      errors = { ...errors, text: 'Text cannot be empty' }
    }

    if (errors.text || errors.title) {
      return errors
    }
  }

  const handleCreate = () => {
    const errors = checkValidation()
    if (errors) {
      setError(errors)
      return
    }

    const postTagIds = post.tags.map((tag) => ({
      id: tag.id
    }))

    const newPost = { ...post, tags: postTagIds }
    addPost.mutate(newPost as any)
    setSaved(true)
    setPost({ title: '', text: '', tags: [] })
  }

  const handleChange = (feild: string, value: string) => {
    setPost({ ...post, [feild]: value })

    if (saved) setSaved(false)

    if (error.text || error.title) setError({ title: '', text: '' })
  }
  return (
    <>
      <Paper elevation={5} sx={{ p: 4, maxWidth: 700 }}>
        <Box
          display="flex"
          justifyContent={'space-between'}
          alignItems="center"
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Create Post
          </Typography>
          <Button variant="contained" onClick={handleCreate}>
            Save
          </Button>
        </Box>
        <Box maxWidth={400}>
          <TextField
            error={!!error.title}
            helperText={error.title}
            variant="filled"
            value={post.title}
            label={
              <Typography color="#000" variant="body2">
                Title
              </Typography>
            }
            InputProps={{
              disableUnderline: true,
              style: { minHeight: 53.63 }
            }}
            onChange={(e) => handleChange('title', e.target.value)}
            sx={(theme) => ({ marginBottom: `${theme.spacing(3)}` })}
          />

          <TextField
            error={!!error.text}
            helperText={error.text}
            variant="filled"
            fullWidth
            multiline
            value={post.text}
            rows={10}
            label={
              <Typography color="#000" variant="body2">
                Text
              </Typography>
            }
            InputProps={{
              disableUnderline: true,
              style: { minHeight: 53.63 }
            }}
            onChange={(e) => handleChange('text', e.target.value)}
            sx={(theme) => ({ marginBottom: `${theme.spacing(3)}` })}
          />

          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={tags ?? []}
            getOptionLabel={(option) => option.label}
            value={post.tags}
            onChange={(e, tags) => setPost({ ...post, tags })}
            renderTags={(value: any[], getTagProps: any) =>
              value.map((option: any, index: any) => (
                <Chip
                  key={`${option.id}_${index}`}
                  label={option.label}
                  size="small"
                  {...getTagProps({ index })}
                  sx={(theme) => ({
                    margin: theme.spacing(1, 2, 1, 0),
                    backgroundColor: '#CFD8DC'
                  })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="limitTags"
                variant="filled"
                placeholder="Favorites"
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  style: { minHeight: 60.63, marginBottom: '10px' }
                }}
              />
            )}
          />
          {saved && (
            <Typography variant="body2" color="#40c740">
              Post was Created
            </Typography>
          )}
        </Box>
      </Paper>
    </>
  )
}

export default AddPost
