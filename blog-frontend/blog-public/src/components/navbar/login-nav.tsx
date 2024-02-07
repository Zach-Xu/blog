import React from 'react'
import { UserIcon } from '@heroicons/react/24/solid'
import useSettingStore from '../../store/setting-store'

const LoginNav = () => {
    const isLoginModalShown = useSettingStore(state => state.isLoginModalShown)
    const toggleLoginModal = useSettingStore(state => state.toggleLoginModal)

    return (
        <li className='relative group flex items-center cursor-pointer'
            onClick={() => toggleLoginModal(!isLoginModalShown)}
        >
            <div className='relative flex items-center menu-underline  hover:before:w-full'>
                <UserIcon className='w-5 h-5' />
                <span className='ml-2'>Login</span>
            </div>
        </li>
    )
}

export default LoginNav