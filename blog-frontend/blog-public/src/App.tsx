
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'

import { homeService } from './services/resources/home-service'
import { useEffect } from 'react'
import { authService } from './services/resources/auth-service'
import useUserStore from './store/user-store'
import { useMutation, useQuery } from '@tanstack/react-query'

let ditInit = false

function App() {

  const updateUser = useUserStore(state => state.updateUser)

  const { mutate: updateVisitCount } = useMutation({
    mutationKey: ['updateVisitCount'],
    mutationFn: homeService.updateSiteVisitCount
  })

  const { data: user, refetch: verifyToken } = useQuery({
    queryKey: ['verifyToken'],
    queryFn: authService.verifyToken,
    enabled: false,

  })

  useEffect(() => {
    if (!ditInit) {
      ditInit = true
      updateVisitCount()
      verifyToken()
    }
  }, [])

  useEffect(() => {
    if (user) {
      updateUser(user)
    }
  }, [user])

  return (
    <RouterProvider router={router} />
  )
}

export default App
