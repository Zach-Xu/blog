import React, { useEffect, useRef } from 'react'
import { menus } from '../menus/menus'
import { Link, useLocation } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import SideLoginNav from './side-login-nav'
import useSettingStore from '../../store/setting-store'

interface Props {
    scrollTop?: number
}

const SideNav = ({ scrollTop = 0 }: Props) => {

    const { pathname } = useLocation()
    const isLoginModalShown = useSettingStore(state => state.isLoginModalShown)
    const isRegisterModalShown = useSettingStore(state => state.isRegisterModalShown)

    return (
        <nav>
            <ul className='group/sidebar caret-transparent '>
                {
                    menus.map((menu, idx) => (
                        <li key={idx} className='group z-50' >
                            {
                                menu.path ?
                                    <Link to={menu.path} className={`flex justify-center items-center py-2 hover:bg-gradient-pink hover:text-black ${(pathname == menu.path && !isLoginModalShown && !isRegisterModalShown) ? 'py-2 bg-gradient-pink group-hover/sidebar:bg-none group-hover/sidebar:text-gray-300 group-hover/sidebar:hover:text-black  group-hover/sidebar:hover:bg-gradient-pink  text-black ' : 'text-gray-300'}`} >
                                        {React.cloneElement(menu.icon, { className: 'w-5 h-5' })}
                                        <span className='ml-2'>{menu.name}</span>
                                    </Link>
                                    :
                                    <>
                                        <div
                                            className={`flex relative justify-center items-center py-2 hover:bg-gradient-pink hover:text-black ${(pathname == menu.path && !isLoginModalShown && !isRegisterModalShown) ? 'py-2 bg-gradient-pink group-hover/sidebar:bg-none group-hover/sidebar:text-gray-300 group-hover/sidebar:hover:text-black  group-hover/sidebar:hover:bg-gradient-pink  text-black ' : 'text-gray-300'}`} >
                                            <ChevronLeftIcon className='w-5 absolute left-3' />
                                            <div className='flex items-center h-full'>
                                                {React.cloneElement(menu.icon, { className: 'w-5 h-5' })}
                                                <span className='ml-2'>{menu.name}</span>
                                            </div>
                                        </div>
                                        {
                                            menu.children &&
                                            <ul style={{ transform: `translateY(-${scrollTop + 40}px)` }} className={`absolute right-[250px] bg-gray-700 text-gray-300 rounded-lg overflow-hidden z-60 hidden group-hover:block`}>
                                                {
                                                    menu.children.map((subMenu, sIdx) => (
                                                        subMenu.path &&
                                                        <li key={sIdx}>
                                                            <Link to={subMenu.path} className='relative p-2 flex items-center hover:bg-gradient-pink hover:text-black' >
                                                                {React.cloneElement(subMenu.icon, { className: 'w-5 h-5' })}
                                                                <span className='ml-2'>{subMenu.name}</span>
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        }
                                    </>
                            }

                        </li>

                    ))
                }
                <SideLoginNav />
            </ul>
        </nav>
    )
}

export default SideNav