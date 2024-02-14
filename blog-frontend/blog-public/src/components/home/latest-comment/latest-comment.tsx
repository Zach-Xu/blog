import React from 'react'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import CommentCard from './comment-card'
import { useQuery } from '@tanstack/react-query'
import { homeService } from '../../../services/resources/home-service'

const LatestComments = () => {

    const { data: comments } = useQuery({
        queryKey: ['latestComments'],
        queryFn: homeService.getLatestComments
    })

    return (
        <div className='shadow-around-hover rounded-lg flex flex-col p-4 text-gray-400 space-y-4'>
            <div className='flex items-center text-gray-300 space-x-4 text-lg'>
                <ChatBubbleOvalLeftEllipsisIcon className='w-5 ' />
                <h4>Latest comments</h4>
            </div>
            {
                comments &&
                comments.map((comment, idx) => (
                    <CommentCard key={idx} comment={comment} />
                ))
            }

        </div>
    )
}

export default LatestComments