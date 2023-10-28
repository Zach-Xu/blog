import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { authService } from '../services/auth/auth-sevice'
import { useLocalStorage } from '../hooks/use-localstorage'
import { Navigate } from 'react-router-dom'
import { updateUser } from '../redux/slices/auth-slice'
import { useEffect, useState } from 'react'
import Loading from './common/loading'

interface Props {
    children: React.ReactNode
}

const AuthGuard = ({ children }: Props) => {
    const { user } = useSelector((state: RootState) => state.auth)

    const [isLoading, setIsLoading] = useState(true)
    const [validated, setValidate] = useState(false)

    const dispatch = useDispatch()

    const [token] = useLocalStorage<string>('tk')

    useEffect(() => {
        const verifyToken = async () => {
            const user = await authService.verifyToken()
            if (user) {
                dispatch(updateUser(user))
                setValidate(true)
            } else {
                // invalid or expired token
                setValidate(false)
            }
            setIsLoading(false)
        }

        if (!user && token) {
            verifyToken()
        } else {
            // user is presented in redux state
            setIsLoading(false)
            setValidate(true)
        }

    }, [user, token])


    if (!token) {
        return <Navigate to='/login' />
    }

    return (
        isLoading ?
            (<Loading />)
            :
            (validated ?
                (children)
                :
                (<Navigate to='/login' />))

    )
}

export default AuthGuard