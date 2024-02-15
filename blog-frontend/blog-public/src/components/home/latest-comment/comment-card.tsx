import React from 'react'
import LazyLoadImage from '../featured-articles/lazy-load-image'

interface Props {
    comment: LatestComment
}

const CommentCard = ({ comment }: Props) => {
    return (
        <div className='flex items-center'>
            <div className='w-[4.2rem] h-[4.2rem] overflow-hidden rounded-full'>
                <LazyLoadImage src={comment.userAvatar || '/assets/default-user.jpg'} alt="user avatar"
                    className='w-full h-full object-cover'
                />
            </div>
            <div className='w-[calc(100%-4.2rem)] h-[4.2rem] pl-[0.625rem] text-sm flex flex-col justify-between'>
                <div className='text-gray-300'>{comment.username}</div>
                <div className='text-xs'>{new Date(comment.createdTime).toLocaleDateString()}</div>
                <div className='line-clamp-1'>{comment.content}</div>
            </div>
        </div>
    )
}

export default CommentCard