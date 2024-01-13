import React, { createContext, useState } from 'react'
import Header from './header'
import { Outlet } from 'react-router-dom'
import SideDrawer from '../components/sidedrawer/side-drawer'
import { useOpenClose } from '../hooks/use-open-close'


const Layout = () => {

    const { open, handleOpen, handleClose } = useOpenClose()

    return (
        <div className='relative min-h-screen'>

            <Header />
            <SideDrawer open={open} />
            <main className='flex flex-col w-full pt-[8rem]'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout