
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { useMutation } from 'react-query'
import { homeService } from './services/resources/home-service'
import { useEffect } from 'react'

let ditInit = false

function App() {

  const { mutate } = useMutation('updateVisitCount', homeService.updateSiteVisitCount)

  useEffect(() => {
    if (!ditInit) {
      ditInit = true
      mutate()
    }
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App
