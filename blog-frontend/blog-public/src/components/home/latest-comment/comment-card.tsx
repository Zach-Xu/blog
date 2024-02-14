import React from 'react'

interface Props {
    comment: LatestComment
}

const CommentCard = ({ comment }: Props) => {
    return (
        <div className='flex items-center'>
            <img src="https://avatars.githubusercontent.com/u/111215609?v=4" alt="user avatar"
                className='w-[4.2rem] h-[4.2rem] rounded-xl'
            />
            <div className='w-[calc(100%-4.2rem)] h-[4.2rem] pl-[0.625rem] text-sm flex flex-col justify-between'>
                <div className='text-gray-300'>{comment.username}</div>
                <div className='text-xs'>{new Date(comment.createdTime).toLocaleDateString()}</div>
                <div className='line-clamp-1'>{comment.content}</div>
            </div>
        </div>
    )
}

export default CommentCard