import { RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme/create-theme'
import { useAppRouter } from './routers/router'
import { ToastContainer } from 'react-toastify'


function App() {
  const { router } = useAppRouter()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App
