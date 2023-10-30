import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useLocalStorage } from '../hooks/use-localstorage'
import { Navigate } from 'react-router-dom'
import { verifyToken } from '../redux/slices/auth-slice'
import { useEffect, useState } from 'react'
import Loading from './common/loading'
import { toast } from 'react-toastify'


interface Props {
    children: React.ReactNode
}

const AuthGuard = ({ children }: Props) => {
    const { user } = useSelector((state: RootState) => state.auth)

    const [isLoading, setIsLoading] = useState(true)
    const [valid, setValid] = useState(false)

    const dispatch = useDispatch<AppDispatch>()

    const [token] = useLocalStorage<string>('tk')

    useEffect(() => {
        if (!user && token) {
            dispatch(verifyToken())
                .then(() => setValid(true))
                .catch(() => setValid(false))
                .finally(() => setIsLoading(false))
        } else {
            // user is presented in redux state
            setIsLoading(false)
            setValid(true)
        }

    }, [user, token])


    if (!token) {
        toast.error('Session expired, please log in again')
        return <Navigate to='/login' />
    }

    return (
        isLoading ?
            (<Loading />)
            :
            (valid ?
                children
                :
                < Navigate to='/login' />
            )
    )
}

export default AuthGuard