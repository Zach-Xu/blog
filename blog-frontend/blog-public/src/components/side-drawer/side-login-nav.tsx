import React from 'react'
import useSettingStore from '../../store/setting-store'
import { UserIcon } from '@heroicons/react/24/solid'

const SideLoginNav = () => {

    const isLoginModalShown = useSettingStore(state => state.isLoginModalShown)
    const isRegisterModalShown = useSettingStore(state => state.isRegisterModalShown)
    const toggleLoginModal = useSettingStore(state => state.toggleLoginModal)

    return (
        <li className='group z-50 cursor-pointer'
            onClick={() => toggleLoginModal(!isLoginModalShown)}
        >
            <div className={`flex justify-center items-center py-2 hover:bg-gradient-pink hover:text-black ${(isLoginModalShown || isRegisterModalShown) ? 'py-2 bg-gradient-pink group-hover/sidebar:bg-none group-hover/sidebar:text-gray-300 group-hover/sidebar:hover:text-black  group-hover/sidebar:hover:bg-gradient-pink  text-black ' : 'text-gray-300'}`} >
                <UserIcon className='w-5 h-5' />
                <span className='ml-2'>Login</span>
            </div>
        </li>
    )
}

export default SideLoginNav