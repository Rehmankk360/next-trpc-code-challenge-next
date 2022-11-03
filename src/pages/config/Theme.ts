/* eslint-disable prettier/prettier */
import { createTheme } from '@mui/material/styles'
// eslint-disable-next-line prettier/prettier
import { red } from '@mui/material/colors'
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    }
  }
})
export default theme
