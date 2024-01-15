import Header from './header'
import { Outlet } from 'react-router-dom'
import SideDrawer from '../components/sidedrawer/side-drawer'


const Layout = () => {

    return (
        <div className='relative min-h-screen'>

            <Header />
            <SideDrawer />
            <main className='flex flex-col w-full'>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout