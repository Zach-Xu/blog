import React from 'react'
import { Link } from 'react-router-dom'
import { menus } from '../menus/menus'

const NavBar = () => {
    return (
        <ul className='gap-5 hidden md:flex caret-transparent lg:gap-6'>
            {
                menus.map((menu, idx) => (
                    <li key={idx} >
                        <Link to={menu.path} className='relative flex items-center menu-underline  hover:before:w-full' >
                            {React.cloneElement(menu.icon, { className: 'w-5 h-5' })}
                            <span className='ml-2'>{menu.name}</span>
                        </Link>
                    </li>

                ))
            }
        </ul>
    )
}

export default NavBar