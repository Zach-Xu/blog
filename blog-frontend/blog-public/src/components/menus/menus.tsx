import { HomeIcon, BookOpenIcon, LinkIcon, ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, UserIcon } from "@heroicons/react/24/outline";
import { Menu } from "../../types/navbar";

export const menus: Menu[] = [
    {
        name: 'Home',
        path: '/home',
        icon: <HomeIcon />
    },
    {
        name: 'Article',
        path: '/article',
        icon: <BookOpenIcon />
    },
    {
        name: 'Links',
        path: '/links',
        icon: <LinkIcon />
    },
    {
        name: 'Comments',
        path: '/comments',
        icon: <ChatBubbleOvalLeftEllipsisIcon />
    },
    {
        name: 'About',
        path: '/about',
        icon: <PaperAirplaneIcon />
    },
    {
        name: 'Login',
        path: '/login',
        icon: <UserIcon />
    }
]