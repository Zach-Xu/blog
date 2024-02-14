import React from 'react'
import Wave from '../layout/wave'
import { Link } from 'react-router-dom';

import { tagService } from '../services/resources/tag-service';
import { useQuery } from '@tanstack/react-query';

const getFontSize = (count: number) => {
    return ((1 + 6 * count / 10) / 3) * 2 + "rem";
}

const colors: string[] = ['text-orange-300', 'text-green-300', 'text-yellow-500', 'text-stone-500',
    'text-indigo-500', 'text-emerald-800', 'text-red-500', 'text-blue-400', 'text-amber-500',
    'text-purple-500', 'text-pink-500', 'text-fuchsia-400', 'text-cyan-600', 'text-lime-500'
]

const length = colors.length


const TagStats = () => {

    const { data: tags } = useQuery({
        queryKey: ['tagStats'],
        queryFn: tagService.getTagStats
    })

    return (
        <div className='min-h-screen  relative caret-transparent'>
            <div className='h-[70vh] relative -z-20'>
                <div className='h-[70vh] fixed w-full bg-archive bg-image-cover bg-cover bg-no-repeat bg-center text-white flex justify-center items-center'>
                    <h1 className='font-bold text-4xl md:text-5xl '>
                        Tag
                    </h1>
                </div>
                <Wave opacity='medium' />
            </div>

            {/* Main Container */}
            <div className='relative bg-[#222] min-h-[30vh] z-10 p-4 text-gray-300'>
                <div className='shadow-around-hover rounded-lg p-6 md:p-8 lg:p-10 lg:w-[60.5rem] mx-auto flex flex-col'>
                    <div className='w-full flex justify-center items-center flex-wrap'>
                        {
                            tags && tags.map(tag => {
                                const textColor = colors[Math.floor((Math.random() * length))]
                                return (
                                    <Link key={tag.id} to={`/articles?tagId=${tag.id}`} state={{ tagName: tag.tagName }} style={{ fontSize: `${getFontSize(tag.articleCount)}` }} className={`${textColor} px-2 transition-all duration-300 hover:scale-110`} >
                                        {tag.tagName}
                                        <sup>{tag.articleCount}</sup>
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

export default TagStats