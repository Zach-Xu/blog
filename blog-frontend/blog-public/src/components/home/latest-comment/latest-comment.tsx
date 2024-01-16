import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import React from 'react'
import CommentCard from './comment-card'

const LatestComments = () => {
    return (
        <div className='shadow-around-hover rounded-lg flex flex-col p-4 text-gray-400 space-y-4'>
            <div className='flex items-center text-gray-300 space-x-4 text-lg'>
                <ChatBubbleOvalLeftEllipsisIcon className='w-5 ' />
                <h4>Latest comments</h4>
            </div>
            <CommentCard />
            <CommentCard />
        </div>
    )
}

export default LatestComments