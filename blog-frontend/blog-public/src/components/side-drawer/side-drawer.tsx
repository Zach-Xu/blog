import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleSideBarSetting } from '../../redux/slices/setting-slice';
import UserCard from '../home/user-card';
import SideNav from './side-nav';



const SideDrawer = () => {

    const isSideBarShown = useSelector((state: RootState) => state.setting.isSideBarShown)

    const [scrollTop, setScrollTop] = useState(0)

    const drawerRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        if (!drawerRef.current) {
            return
        }

        const getScrollTop = () => {
            if (drawerRef && drawerRef.current) {
                setScrollTop(drawerRef.current.scrollTop)
            }
        }

        drawerRef.current.addEventListener('scroll', getScrollTop)

        return () => {
            drawerRef.current?.removeEventListener('scroll', getScrollTop)
        }

    }, [])

    return (
        <div className={`lg:hidden caret-transparent fixed  h-full  top-0 -right-[250px] w-[250px] bg-[#21252b] transition-all duration-300 ease-in-out z-50 
        ${isSideBarShown ? 'right-0' : ''}`}>
            <div className='relative h-full'>
                <div ref={drawerRef} className='side-drawer w-full h-full text-white overflow-auto  no-scrollbar'>
                    <UserCard />
                    <SideNav scrollTop={scrollTop} />

                </div>
            </div>
        </div>
    )
}

export default SideDrawer