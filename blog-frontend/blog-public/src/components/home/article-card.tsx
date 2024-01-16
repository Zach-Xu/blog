import { CalendarDaysIcon, EyeDropperIcon, FlagIcon, TagIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface Props {
    reverse: boolean
}

const ArticleCard = ({ reverse }: Props) => {

    return (
        <div className={`flex flex-col group ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} shadow-around hover:shadow-around-hover bg-[#222222] text-[#aaa] rounded-xl overflow-hidden m-3  border-gray-900`}>
            <div className={`h-[14rem] md:w-1/2 overflow-hidden ${reverse ? 'clip-image-bl md:clip-image-lb' : 'clip-image-br md:clip-image-rt'}`}>
                <img src="/assets/bg1.png" alt="Article cover image" className='object-cover w-full h-full group-hover:scale-105 group-hover:rotate-1 transition-all ease-in-out duration-200' />
            </div>
            <div className='h-[14rem] md:w-1/2 flex flex-col justify-between space-y-5'>
                {/* Article Info */}
                <div className={`flex ${reverse ? 'justify-start ml-4' : 'justify-end mr-4'} space-x-2 md:mt-4 md:ml-4`}>
                    <div className='flex items-center space-x-1 text-[#d96d7f]'>
                        <EyeDropperIcon className='w-4' />
                        <span className=''>Pinned</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <CalendarDaysIcon className='w-4' />
                        <span>2024-01-14</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <TagIcon className='w-4' />
                        <span>Project</span>
                    </div>
                </div>
                {/* Article Intro */}

                <h4 className='text-[#d96d7f] text-lg mx-4'>Project Introduction</h4>
                <p className='line-clamp-3 mx-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla totam nemo cumque? Alias dolore debitis amet excepturi voluptas eos natus!</p>
                <div className={`flex  ${reverse ? 'flex-row pr-4' : 'flex-row-reverse pl-4'}  justify-between items-center text-[#aaa]`}>
                    <div className={`text-black bg-gradient-to-r  from-[#c67696] to-[#c78a75] text-lg py-2 px-4 ${reverse ? 'rounded-tr-lg' : 'rounded-tl-lg md:rounded-tl-lg md:rounded-tr-none'} `}>more...    </div>
                    <div className={`flex items-center md:pl-2 `}>
                        <FlagIcon className='w-4 mr-2' />
                        <span>category</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard