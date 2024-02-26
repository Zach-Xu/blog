import React from 'react'
import { MegaphoneIcon } from '@heroicons/react/24/outline'

const NoticeCard = () => {
    return (
        <div className='shadow-around-hover rounded-lg p-4 space-y-2'>
            <div className='flex items-center space-x-4'>
                <MegaphoneIcon className='w-6 animate-bounce text-red-500' />
                <span className='text-gray-300 text-lg'>Notice</span>
            </div>
            <p className='text-gray-400'>
                {/* Backend developed based on Spring Boot, frontend developed based on React with TailwindCSS and Material UI,  
                <a href='https://github.com/Zach-Xu/blog' target='_blank' className='text-blue-500'> source code</a> */}
                Currently looking for a web developer job
            </p>
        </div>
    )
}

export default NoticeCard