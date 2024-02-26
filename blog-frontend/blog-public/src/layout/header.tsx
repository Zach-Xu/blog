import { useEffect, useState } from "react";
import NavBar from "../components/navbar/navbar";
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useSettingStore from "../store/setting-store";
import { toast } from "react-toastify";


const Header = () => {

    const isSideBarShown = useSettingStore(state => state.isSideBarShown)
    const toggleSideBar = useSettingStore(state => state.toggleSideBar)

    // previous scroll position
    const [y, setY] = useState(0)

    const [headerClassName, setHeaderClassName] = useState('')

    const [isDark, setIsDark] = useState(true)

    const setDarkTheme = () => {
        setIsDark(true)
        return toast.error('To be implemented')
        document.documentElement.classList.add("dark")
    }
    const setLightTheme = () => {
        setIsDark(false)
        return toast.error('To be implemented')
        document.documentElement.classList.remove("dark")
    }

    const handleScroll = () => {
        const currentScrollPosition = window.scrollY

        if (currentScrollPosition > 0) {
            if (currentScrollPosition < y) {
                // show header when scroll up
                setHeaderClassName('shadow-md text-shadow-md translate-y-0')
            } else {
                // hide header when scroll down
                setHeaderClassName('shadow-md text-shadow-md -translate-y-full')
            }
        } else {
            // scrollbar is already at the top
            setHeaderClassName('')
        }

        setY(currentScrollPosition)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [y])

    return (
        <header className={`bg-[#312e31] opacity-80 text-gray-300 fixed flex flex-nowrap items-center justify-between  w-full h-[3.125rem] px-[1rem]
        text-shadow-md text-header-text-color transition-all duration-200 ease-in-out z-9 caret-transparent ${headerClassName} z-30`}>
            {
                isSideBarShown ?
                    <XMarkIcon className="btn-show-drawer w-7 cursor-pointer lg:hidden"
                        onClick={() => toggleSideBar(!isSideBarShown)}
                    />
                    :
                    <Bars3Icon className="btn-show-drawer w-7 cursor-pointer lg:hidden"
                        onClick={() => toggleSideBar(!isSideBarShown)}
                    />
            }

            <span className="md:hidden lg:inline-block text-inherit">Hello World</span>
            <NavBar />
            {
                isDark ?
                    <MoonIcon className="w-5 cursor-pointer" onClick={setLightTheme} />
                    :
                    <SunIcon className="w-5 cursor-pointer" onClick={setDarkTheme} />
            }

        </header>
    )
}

export default Header