import React from 'react'
import useSettingStore from '../../store/setting-store'
import { ArrowRightStartOnRectangleIcon, ChevronLeftIcon, UserIcon } from '@heroicons/react/24/solid'
import useUserStore from '../../store/user-store'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { authService } from '../../services/resources/auth-service'

interface Props {
    scrollTop?: number
}


const SideUserMenu = ({ scrollTop = 0 }: Props) => {

    const user = useUserStore(state => state.user)
    const updateUser = useUserStore(state => state.updateUser)

    const isLoginModalShown = useSettingStore(state => state.isLoginModalShown)
    const isRegisterModalShown = useSettingStore(state => state.isRegisterModalShown)
    const toggleLoginModal = useSettingStore(state => state.toggleLoginModal)

    const { mutate } = useMutation('logout', authService.logout)

    const logOut = () => {
        updateUser(null)
        mutate()
    }

    return (
        <>
            {
                user ?
                    <li className='group z-50' >
                        <div
                            className={`flex relative justify-center items-center py-2  hover:bg-gradient-pink hover:text-black ${(isLoginModalShown && isRegisterModalShown) ? 'py-2 bg-gradient-pink group-hover/sidebar:bg-none group-hover/sidebar:text-gray-300 group-hover/sidebar:hover:text-black  group-hover/sidebar:hover:bg-gradient-pink  text-black ' : 'text-gray-300'}`} >
                            <div className='flex items-center h-full'>
                                <img src={user.avatar || '/assets/default-user.jpg'} className='w-8 h-8 rounded-full' />
                                <span className='ml-2'>{user.username}</span>
                            </div>
                            <ChevronLeftIcon className='w-5 absolute left-3' />

                        </div>
                        <ul style={{ transform: `translateY(-${scrollTop + 40}px)` }} className={`cursor-pointer w-max absolute right-[250px] bg-gray-700 text-gray-300 rounded-lg overflow-hidden z-60 hidden group-hover:block`}>
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
                    <li className='group z-50 cursor-pointer'
                        onClick={() => toggleLoginModal(!isLoginModalShown)}
                    >
                        <div className={`flex justify-center items-center py-2 hover:bg-gradient-pink hover:text-black ${(isLoginModalShown || isRegisterModalShown) ? 'py-2 bg-gradient-pink group-hover/sidebar:bg-none group-hover/sidebar:text-gray-300 group-hover/sidebar:hover:text-black  group-hover/sidebar:hover:bg-gradient-pink  text-black ' : 'text-gray-300'}`} >
                            <UserIcon className='w-5 h-5' />
                            <span className='ml-2'>Login</span>
                        </div>
                    </li>
            }
        </>
    )
}

export default SideUserMenu