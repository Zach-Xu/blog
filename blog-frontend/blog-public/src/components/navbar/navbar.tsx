import React from 'react'
import { Link } from 'react-router-dom'
import { menus } from '../menus/menus'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import LoginNav from './login-nav'

const NavBar = () => {
    return (
        <ul className='gap-5 hidden md:flex caret-transparent lg:gap-6 h-full'>
            {
                menus.map((menu, idx) => (
                    <li key={idx} className='relative group flex items-center' >
                        {
                            menu.path ?
                                <Link to={menu.path} className='relative flex items-center menu-underline  hover:before:w-full' >
                                    {React.cloneElement(menu.icon, { className: 'w-5 h-5' })}
                                    <span className='ml-2'>{menu.name}</span>
                                </Link>
                                :
                                menu.children &&
                                <>
                                    <div className='relative flex items-center '>
                                        {React.cloneElement(menu.icon, { className: 'w-5 h-5' })}
                                        <span className='ml-2'>{menu.name}</span>
                                        <ChevronDownIcon className='w-4 pl-1' />
                                    </div>
                                    <ul className='absolute bg-[#21252b] rounded-lg overflow-hidden top-[3.125rem] -left-[0.5rem] z-10 hidden group-hover:block'>
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
                                </>
                        }
                    </li>
                ))
            }
            <LoginNav />
        </ul>
    )
}

export default NavBar