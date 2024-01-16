import React from 'react'
import { menus } from '../menus/menus'
import { Link, useLocation } from 'react-router-dom'

const SideNav = () => {

    const { pathname } = useLocation()

    return (
        <nav>
            <ul className='caret-transparent '>
                {
                    menus.map((menu, idx) => (
                        <li key={idx} >
                            <Link to={menu.path} className={`flex justify-center items-center py-2 hover:bg-gradient-to-r hover:from-[#c67696] hover:to-[#c78a75] hover:text-black ${pathname == menu.path ? 'py-2 bg-gradient-to-r from-[#c67696] to-[#c78a75] text-black' : 'text-gray-400'}`} >
                                {React.cloneElement(menu.icon, { className: 'w-5 h-5' })}
                                <span className='ml-2'>{menu.name}</span>
                            </Link>
                        </li>

                    ))
                }
            </ul>
        </nav>
    )
}

export default SideNav