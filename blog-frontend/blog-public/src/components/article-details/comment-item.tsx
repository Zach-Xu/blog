import { HandThumbUpIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import ReplyBox from './reply-box'

interface ReplyUser {
    commentId: number
    username: string
}

// interface Comment {
//     id: number
//     username: string
//     like: number
//     content: string
//     date: string
//     children: SubComment[] | null
// }

// interface SubComment {
//     id: number
//     username: string
//     like: number
//     toCommentId: number
//     content: string
//     date: string
// }

interface Props {
    comment: Comment
}

const CommentItem = ({ comment }: Props) => {

    const [replyUser, setReplyUser] = useState<ReplyUser | null>(null)

    // store reply user info in redux so that only one ReplyBox can be shown at a time

    const handleReplyClick = (user: ReplyUser) => {
        if (replyUser && replyUser.commentId == user.commentId) {
            setReplyUser(null)
        } else {
            setReplyUser(user)
        }

    }

    return (
        <div className='flex justify-start mt-6'>
            <img src={comment.userAvatar || '/assets/default-user.jpg'} alt="user avatar" className='h-[50px] object-cover rounded-full mr-2' />
            <div className='flex-1 border-b pb-3 border-gray-500'>
                {/* Main Comment */}
                <div className='flex flex-col justify-between'>
                    <span className='text-sm text-[#ea7e90]'>{comment.username}</span>
                    <p className='text-sm'>{comment.content}</p>
                    {/* Reply Time */}
                    <div className='flex items-center space-x-6 text-sm'>
                        <div>{new Date(comment.createdTime).toLocaleDateString()}</div>
                        {/* Like comment */}
                        {/* To be implemented */}
                        {/* <div className='flex items-center space-x-2'>
                            <HandThumbUpIcon className='w-4' />
                            <span>{comment.like}</span>
                        </div> */}
                        <button className='hover:text-[#ea7e90]'
                            onClick={() => handleReplyClick({ commentId: comment.commentId, username: comment.username })}>reply</button>
                    </div>
                </div>

                {/* Sub Comments */}
                {
                    comment.subComments && comment.subComments.length > 0 &&
                    comment.subComments.map(subComment => (
                        <div key={subComment.commentId}>
                            <div className='flex w-full mt-4  caret-white'>
                                <img src={subComment.userAvatar || '/assets/default-user.jpg'} alt="user avatar" className='w-6 h-6 object-cover rounded-full mr-2' />
                                <div>
                                    <div className='text-sm space-x-2'>
                                        {/* reply to parent comment */}
                                        <div>
                                            {
                                                (subComment.toUsername && subComment.toCommentId !== comment.commentId) ?
                                                    <>
                                                        <span className='text-[0.78rem] text-white'>{subComment.username}</span>  reply <span className='text-blue-500'>@ {subComment.toUsername}</span> {`: ${subComment.content}`}
                                                    </>
                                                    :
                                                    <>
                                                        <span className='text-[0.78rem] text-white'>{subComment.username}</span>  {subComment.content}
                                                    </>
                                            }
                                        </div>
                                    </div>
                                    {/* Reply Time */}
                                    <div className='flex items-center space-x-6 text-sm'>
                                        <div>{new Date(subComment.createdTime).toLocaleDateString()}</div>
                                        {/* To be implemented */}
                                        {/* <div className='flex items-center space-x-2'>
                                            <HandThumbUpIcon className='w-4' />
                                            <span>{subComment.like}</span>
                                        </div> */}
                                        {/* use subComment id for UI design phase  */}
                                        <button className='hover:text-[#ea7e90]'
                                            onClick={() => handleReplyClick({ commentId: subComment.commentId, username: subComment.username })}>reply</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))
                }

                {replyUser && <ReplyBox rootCommentId={comment.commentId} toCommentId={replyUser.commentId} articleId={comment.articleId} placeholder={`reply @${replyUser.username}:`} />}
            </div>
        </div>
    )
}

export default CommentItem