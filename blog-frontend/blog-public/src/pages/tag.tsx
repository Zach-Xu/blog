import React from 'react'
import Wave from '../layout/wave'
import { Link } from 'react-router-dom';

const getFontSize = (count: number) => {
    return ((1 + 6 * count / 10) / 3) * 2 + "rem";
}

const colors: string[] = ['text-orange-300', 'text-green-300', 'text-yellow-500', 'text-stone-500',
    'text-indigo-500', 'text-emerald-800', 'text-red-500', 'text-blue-400', 'text-amber-500',
    'text-purple-500', 'text-pink-500', 'text-fuchsia-400', 'text-cyan-600', 'text-lime-500'
]

const length = colors.length


const Tag = () => {

    let tags = [
        { id: 1, name: "Java", count: 3 },
        { id: 2, name: "React", count: 1 },
        { id: 4, name: "CSS", count: 2 },
        { id: 3, name: "DevOps", count: 1 },
        { id: 5, name: "LeetCode", count: 6 },
        { id: 1, name: "frontend", count: 3 },
        { id: 4, name: "CSS", count: 2 },
        { id: 3, name: "DevOps", count: 1 },
        { id: 5, name: "LeetCode", count: 6 },

    ];


    return (
        <div className='min-h-screen bg-[#222]  relative caret-transparent'>
            <div className='h-[70vh] relative'>
                <div className='h-[70vh] fixed w-full bg-archive bg-cover bg-no-repeat bg-center  flex justify-center items-center'>
                    <h1 className=' bg-white px-6 py-2 opacity-90 rounded-lg font-bold text-xl '>
                        Tag
                    </h1>
                </div>
                <Wave opacity='medium' />
            </div>

            {/* Main Container */}
            <div className='relative bg-[#222]  z-10 p-4 text-gray-300'>
                <div className='shadow-around-hover rounded-lg p-6 md:p-8 lg:p-10 lg:w-[60.5rem] mx-auto flex flex-col'>
                    <div className='w-full flex justify-center items-center flex-wrap'>
                        {
                            tags.map(tag => {
                                const textColor = colors[Math.floor((Math.random() * length))]
                                return (
                                    <Link to={`/tag/${tag.id}`} style={{ fontSize: `${getFontSize(tag.count)}` }} className={`${textColor} px-2 transition-all duration-300 hover:scale-110`} >
                                        {tag.name}
                                        <sup>{tag.count}</sup>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Tag