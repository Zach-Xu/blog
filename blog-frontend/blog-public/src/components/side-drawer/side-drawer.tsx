import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleSideBarSetting } from '../../redux/slices/setting-slice';
import UserCard from '../home/user-card';
import SideNav from './side-nav';



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
        <div className={`fixed flex justify-end h-full overflow-auto no-scrollbar top-0 -right-[250px] w-[500px] bg-transparent transition-all duration-300 ease-in-out z-40
        ${isSideBarShown ? 'right-0' : ''}`}>
            <div className='side-drawer w-[250px]  bg-[#21252b] text-white'>
                <UserCard />
                <SideNav />
            </div>

        </div>
    )
}

export default SideDrawer