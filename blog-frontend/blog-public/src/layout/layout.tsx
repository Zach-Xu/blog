import { useSelector } from 'react-redux'
import SideDrawer from '../components/side-drawer/side-drawer'
import Footer from './footer'
import Header from './header'
import { Outlet } from 'react-router-dom'
import { RootState } from '../redux/store'



const Layout = () => {
    const isSideBarShown = useSelector((state: RootState) => state.setting.isSideBarShown)

    return (
        <div className='relative min-h-screen '>
            <Header />
            <SideDrawer />
            <main className={`flex flex-col w-full ${isSideBarShown && 'lg:before:hidden before:absolute before:w-full before:h-full before:bg-[#1a2831] before:opacity-50 before:z-[40]'}`}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout