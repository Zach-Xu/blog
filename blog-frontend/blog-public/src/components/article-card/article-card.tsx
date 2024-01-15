import { CalendarDaysIcon, EyeDropperIcon, FlagIcon, TagIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface Props {
    reverse: boolean
}

const ArticleCard = ({ reverse }: Props) => {

    return (
        <div className={`flex flex-col group ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} shadow-[0_0.625rem_1.875rem_-0.9375rem_#000] hover:shadow-[0_0_1.5rem_#000] bg-[#222222] text-[#aaa] rounded-xl overflow-hidden m-3  border-gray-900`}>
            <div className={`h-[14rem] md:w-1/2 overflow-hidden ${reverse ? 'clip-image-bl md:clip-image-lb' : 'clip-image-br md:clip-image-rt'}`}>
                <img src="/assets/bg1.png" alt="Article cover image" className='object-cover w-full h-full group-hover:scale-105 group-hover:rotate-1 transition-all ease-in-out duration-200' />
            </div>
            <div className='md:w-1/2 flex flex-col justify-between space-y-5 '>
                {/* Article Info */}
                <div className={`flex ${reverse ? 'justify-start' : 'justify-end'}  space-x-2`}>
                    <div className='flex items-center space-x-1'>
                        <EyeDropperIcon className='w-4' />
                        <span className='text-[#d96d7f]'>Pinned</span>
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
                <div className='md:px-2'>
                    <h4 className='text-[#d96d7f] text-lg'>Project Introduction</h4>
                    <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla totam nemo cumque? Alias dolore debitis amet excepturi voluptas eos natus!</p>
                </div>
                <div className={`flex  ${reverse ? 'flex-row' : 'flex-row-reverse'}  justify-between items-center text-[#aaa]`}>
                    <div className={`text-black bg-gradient-to-r from-pink-300 to-orange-300 text-lg py-2 px-4 ${reverse ? 'rounded-tr-lg' : 'rounded-tl-lg md:rounded-tl-lg md:rounded-tr-none'} `}>more...    </div>
                    <div className='flex items-center space-x-1 md:pl-2'>
                        <FlagIcon className='w-4' />
                        <span>category</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard