import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Link } from 'react-router-dom'

const ArticleItem = () => {
    return (
        <div className='flex relative archive-circle-md pl-5'>
            <Link to={'/article/1'} className='w-[120px] h-[120px]  rounded-2xl overflow-hidden'>
                <img src="/assets/bg2.png" alt="article image" className='w-full h-full object-fill hover:scale-110 hover-image ' />
            </Link>

            <div className='flex flex-col justify-center space-y-2 pl-4'>
                <div className='flex space-x-2'>
                    <CalendarDaysIcon className='w-6' />
                    <div>2024-01-16</div>
                </div>
                <div>Test Article</div>
            </div>
        </div>
    )
}

export default ArticleItem