import { HandThumbUpIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import ReplyBox from './reply-box'

interface ReplyUser {
    id: number
    username: string
}

interface Comment {
    id: number
    username: string
    like: number
    content: string
    date: string
    children: SubComment[] | null
}

interface SubComment {
    id: number
    username: string
    like: number
    toCommentId: number
    content: string
    date: string
}

interface Props {
    comment: Comment
}

const CommentItem = ({ comment }: Props) => {

    const [replyUser, setReplyUser] = useState<ReplyUser | null>(null)

    // store reply user info in redux so that only one ReplyBox can be shown at a time

    const handleReplyClick = (user: ReplyUser) => {
        if (replyUser && replyUser.id == user.id) {
            setReplyUser(null)
        } else {
            setReplyUser(user)
        }

    }

    return (
        <div className='flex justify-start mt-6'>
            <img src="/assets/default-user.jpg" alt="user avatar" className='h-[50px] object-cover rounded-full mr-2' />
            <div className='flex-1 border-b pb-3 border-gray-500'>
                {/* Main Comment */}
                <div className='flex flex-col justify-between'>
                    <span className='text-sm text-[#ea7e90]'>{comment.username}</span>
                    <p className='text-sm'>{comment.content}</p>
                    {/* Reply Time */}
                    <div className='flex items-center space-x-6 text-sm'>
                        <div>{comment.date}</div>
                        <div className='flex items-center space-x-2'>
                            <HandThumbUpIcon className='w-4' />
                            <span>{comment.like}</span>
                        </div>
                        <button className='hover:text-[#ea7e90]'
                            onClick={() => handleReplyClick({ id: comment.id, username: comment.username })}>reply</button>
                    </div>
                </div>

                {/* Sub Comments */}
                {
                    comment.children && comment.children.length > 0 &&
                    comment.children.map(subComment => (
                        <div key={subComment.id}>
                            <div className='flex w-full mt-4 items-center caret-white'>
                                <img src="/assets/default-user.jpg" alt="user avatar" className='w-6 h-6 object-cover rounded-full mr-2' />
                                <div className='text-sm space-x-2'>
                                    <span className='text-[#ea7e90]'>{subComment.username}</span>
                                    {/* reply to parent comment */}
                                    <span>{subComment.content}</span>
                                </div>
                            </div>
                            {/* Reply Time */}
                            <div className='flex items-center space-x-6 text-sm'>
                                <div>{subComment.date}</div>
                                <div className='flex items-center space-x-2'>
                                    <HandThumbUpIcon className='w-4' />
                                    <span>{subComment.like}</span>
                                </div>
                                {/* use subComment id for UI design phase  */}
                                <button className='hover:text-[#ea7e90]'
                                    onClick={() => handleReplyClick({ id: subComment.id, username: subComment.username })}>reply</button>
                            </div>
                        </div>
                    ))
                }

                {replyUser && <ReplyBox placeholder={`reply @${replyUser.username}:`} />}
            </div>
        </div>
    )
}

export default CommentItem