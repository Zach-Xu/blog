import React from 'react'
import { menus } from '../menus/menus'
import { Link, useLocation } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

const SideNav = () => {

    const { pathname } = useLocation()

    return (
        <nav>
            <ul className='group/sidebar caret-transparent '>
                {
                    menus.map((menu, idx) => (
                        <li key={idx} className='relative group z-50' >
                            {
                                menu.path ?
                                    <Link to={menu.path} className={`flex justify-center items-center py-2 hover:bg-gradient-pink hover:text-black ${pathname == menu.path ? 'py-2 bg-gradient-pink text-black group-hover/sidebar:bg-none group-hover/sidebar:text-gray-300' : 'text-gray-300'}`} >
                                        {React.cloneElement(menu.icon, { className: 'w-5 h-5' })}
                                        <span className='ml-2'>{menu.name}</span>
                                    </Link>
                                    :
                                    <>
                                        <div className={`flex relative justify-center items-center py-2 hover:bg-gradient-pink hover:text-black ${pathname == menu.path ? 'py-2 bg-gradient-pink text-black group-hover/sidebar:bg-none group-hover/sidebar:text-gray-300 ' : 'text-gray-300'}`} >
                                            <ChevronLeftIcon className='w-5 absolute left-3' />
                                            <div className='flex items-center h-full'>
                                                {React.cloneElement(menu.icon, { className: 'w-5 h-5' })}
                                                <span className='ml-2'>{menu.name}</span>
                                            </div>
                                        </div>
                                        {
                                            menu.children &&
                                            <ul className='absolute bg-[#21252b] -translate-x-full -translate-y-1/2 rounded-lg overflow-hidden z-60 hidden group-hover:block'>
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
            </ul>
        </nav>
    )
}

export default SideNav