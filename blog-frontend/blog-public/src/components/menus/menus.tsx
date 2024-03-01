import { HomeIcon, BookOpenIcon, LinkIcon, ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, UserIcon } from "@heroicons/react/24/solid";
import { Menu } from "../../types/layouts/navbar";
import { ArchiveBoxIcon, ListBulletIcon, TagIcon } from "@heroicons/react/24/solid";

export const menus: Menu[] = [
    {
        name: 'Home',
        path: '/',
        icon: <HomeIcon />
    },
    {
        name: 'Article',
        icon: <BookOpenIcon />,
        children: [
            {
                name: 'Archive',
                icon: <ArchiveBoxIcon />,
                path: '/archive'
            },
            {
                name: 'Category',
                icon: <ListBulletIcon />,
                path: '/category'
            },
            {
                name: 'Tag',
                icon: <TagIcon />,
                path: '/tag'
            }
        ]
    },
    {
        name: 'Contact',
        path: '/contact',
        icon: <ChatBubbleOvalLeftEllipsisIcon />
    },
    // {
    //     name: 'Links',
    //     path: '/links',
    //     icon: <LinkIcon />
    // },
    // {
    //     name: 'Comments',
    //     path: '/comments',
    //     icon: <ChatBubbleOvalLeftEllipsisIcon />
    // },
    {
        name: 'About',
        path: '/about',
        icon: <PaperAirplaneIcon />
    },
    // {
    //     name: 'Login',
    //     icon: <UserIcon />
    // }
]