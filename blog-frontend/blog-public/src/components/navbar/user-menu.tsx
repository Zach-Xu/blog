import React from 'react'
import { ArrowRightStartOnRectangleIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/24/solid'
import useSettingStore from '../../store/setting-store'
import useUserStore from '../../store/user-store'
import { Link } from 'react-router-dom'
import { authService } from '../../services/resources/auth-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const UserMenu = () => {
    const isLoginModalShown = useSettingStore(state => state.isLoginModalShown)
    const toggleLoginModal = useSettingStore(state => state.toggleLoginModal)

    const user = useUserStore(state => state.user)
    const updateUser = useUserStore(state => state.updateUser)

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: authService.logout,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['verifyToken']
            })
        }
    })

    const logOut = () => {
        updateUser(null)
        mutate()
    }

    return (
        <>
            {
                user ?
                    <li className='relative group flex items-center' >
                        <img src={user.avatar || '/assets/default-user.jpg'} className='w-8 h-8 rounded-full' />
                        <span className='ml-2'>{user.username}</span>
                        <ChevronDownIcon className='w-4 pl-1' />

                        <ul className='w-max absolute bg-[#21252b] cursor-pointer rounded-lg overflow-hidden top-[3.125rem] -left-[0.5rem] z-10 hidden group-hover:block'>
                            <li >
                                <Link to='/user' className='relative p-2 flex items-center hover:bg-gradient-pink hover:text-black' >
                                    <UserIcon className='w-5 h-5' />
                                    <span className='ml-2'>User center</span>
                                </Link>
                            </li>
                            <li onClick={logOut}>
                                <div className='relative p-2 flex items-center hover:bg-gradient-pink hover:text-black' >
                                    <ArrowRightStartOnRectangleIcon className='w-5 h-5' />
                                    <span className='ml-2'>Log out</span>
                                </div>
                            </li>
                        </ul>
                    </li>
                    :
                    <li className='relative group flex items-center cursor-pointer'
                        onClick={() => toggleLoginModal(!isLoginModalShown)}
                    >
                        <div className='relative flex items-center menu-underline  hover:before:w-full'>
                            <UserIcon className='w-5 h-5' />
                            <span className='ml-2'>Login</span>
                        </div>
                    </li>
            }

        </>
    )
}

export default UserMenu