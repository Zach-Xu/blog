import SideDrawer from '../components/side-drawer/side-drawer'
import Footer from './footer'
import Header from './header'
import { Outlet } from 'react-router-dom'



const Layout = () => {

    return (
        <div className='relative min-h-screen'>

            <Header />
            <SideDrawer />
            <main className='flex flex-col w-full'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout