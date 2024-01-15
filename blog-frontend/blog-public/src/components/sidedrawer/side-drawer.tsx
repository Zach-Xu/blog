import React, { useEffect } from 'react'
import { menus } from '../menus/menus';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleSideBarSetting } from '../../redux/slices/setting-slice';



const SideDrawer = () => {

    const isSideBarShown = useSelector((state: RootState) => state.setting.isSideBarShown)

    const dispatch = useDispatch()

    useEffect(() => {
        const closeDrawer = (event: MouseEvent) => {

            if (!isSideBarShown) {
                return
            }

            const targetElement = event.target as HTMLElement

            if (!targetElement.closest('.side-drawer') && !targetElement.closest('.btn-show-drawer')) {
                dispatch(toggleSideBarSetting(false))
            }
        }

        document.addEventListener('click', closeDrawer)

        return () => {
            document.removeEventListener('click', closeDrawer)
        }
    }, [isSideBarShown])

    return (
        <div className={`side-drawer fixed flex flex-col justify-center top-0 -right-[250px] w-[250px] h-full bg-black text-white transition-all duration-300 ease-in-out z-20
        ${isSideBarShown ? 'right-0' : ''}`}>
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