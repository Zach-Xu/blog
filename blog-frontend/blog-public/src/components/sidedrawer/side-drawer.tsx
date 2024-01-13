import React from 'react'
import { menus } from '../menus/menus';
import { Link } from 'react-router-dom';

interface Props {
    open: boolean
}

const SideDrawer = ({ open }: Props) => {


    return (
        <div className={`fixed flex flex-col justify-center top-0 -right-[250px] w-[250px] h-full bg-black text-white transition-transform duration-300 ease-in-out
        ${open ? 'right-0' : ''}`}>
            <nav>
                <ul className='caret-transparent space-y-5'>
                    {
                        menus.map((menu, idx) => (
                            <li key={idx} >
                                <Link to={menu.path} className='flex justify-center' >
                                    {React.cloneElement(menu.icon, { className: 'w-5 h-5' })}
                                    <span className='ml-2'>{menu.name}</span>
                                </Link>
                            </li>

                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default SideDrawer