import { useEffect, useState } from "react";
import NavBar from "../components/navbar/navbar";
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const Header = () => {

    // const app = useSelector((state) => state.app); // Replace with your Redux selector
    // const dispatch = useDispatch(); // Replace with your Redux dispatch function

    const [y, setY] = useState(0);

    const [headerClassName, setHeaderClassName] = useState('');

    const [isDay, setIsDay] = useState(true)

    const handleScroll = () => {
        const newValue = window.scrollY;

        if (newValue > 0) {
            if (newValue < y) {
                setHeaderClassName('shadow-md text-shadow-md translate-y-0');
            } else {
                setHeaderClassName('shadow-md text-shadow-md -translate-y-full');
            }
        } else {
            setHeaderClassName('');
        }

        setY(newValue);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [y]);

    return (
        <header className={`bg-black text-white fixed flex flex-nowrap items-center justify-between  w-full h-[3.125rem] px-[1rem]
        py-[1rem] text-shadow-md text-header-text-color transition-all duration-200 ease-in-out z-9 caret-transparent ${headerClassName}`}>
            <Bars3Icon className="w-7 cursor-pointer md:hidden" />
            <span className="md:hidden lg:inline-block">Hello World</span>
            <div className="w-0 hidden md:block lg:hidden" />
            <NavBar />
            {
                isDay ?
                    <MoonIcon className="w-5 cursor-pointer" onClick={() => setIsDay(false)} />
                    :
                    <SunIcon className="w-5 cursor-pointer" onClick={() => setIsDay(true)} />
            }

        </header>
    )
}

export default Header