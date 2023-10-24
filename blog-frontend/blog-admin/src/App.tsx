import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme/create-theme'
import Welcome from './pages/dashboard/welcome'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Welcome />} />
        <Route path='*' element={<Login />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
