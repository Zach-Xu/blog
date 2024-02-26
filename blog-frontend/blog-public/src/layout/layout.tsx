import SideDrawer from '../components/side-drawer/side-drawer'
import Footer from './footer'
import Header from './header'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/scroll-to-top/scroll-to-top'
import useSettingStore from '../store/setting-store'
import LoginModal from '../components/modal/login-modal'
import RegisterModal from '../components/modal/register-modal'



const Layout = () => {
    const isSideBarShown = useSettingStore(state => state.isSideBarShown)

    return (
        <div className={`relative min-h-screen `}>
            <ScrollToTop />
            <Header />
            <SideDrawer />
            <main className={`flex flex-col w-full  ${isSideBarShown && 'lg:before:hidden before:absolute before:w-full before:h-full before:bg-[#1a2831] before:opacity-50 before:z-[40]'}`}>
                <Outlet />
            </main>
            <LoginModal />
            <RegisterModal />
            <Footer />
        </div>
    )
}

export default Layout