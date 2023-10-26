import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Navigate } from 'react-router-dom'

interface Props {
    children: React.ReactNode
}


const PrivateRoute = ({ children }: Props) => {

    const { user } = useSelector((state: RootState) => state.auth)

    return (
        user ? children : <Navigate to='/login' />
    )
}

export default PrivateRoute