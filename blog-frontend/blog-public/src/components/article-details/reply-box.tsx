import React, { useState } from 'react'

interface Props {
    placeholder?: string
    allowedComment?: boolean
}

const ReplyBox = ({ placeholder = 'Leave a comment...', allowedComment = true }: Props) => {
    const [comment, setComment] = useState('')

    return (
        <div className='flex mt-6 w-full h-[50px] caret-white'>
            <img src="/assets/default-user.jpg" alt="user avatar" className='h-full object-cover rounded-full mr-2' />
            <textarea disabled={!allowedComment} name="" value={comment} onChange={e => setComment(e.target.value)}
                className={` ${comment.length > 0 ? '' : 'leading-[48px]'} ${allowedComment ? '' : 'cursor-not-allowed placeholder:text-center caret-transparent'}  resize-none flex-1 border border-[#444] text-sm  bg-[#21252b]  px-2 rounded-md focus:outline-none`}
                placeholder={allowedComment ? placeholder : 'Comments are turned off'}></textarea>
            <button className={`bg-gradient-pink rounded-md py-2 px-3 text-black ml-2 ${allowedComment ? '' : 'cursor-not-allowed'} `} disabled={!allowedComment}>Reply</button>
        </div>
    )
}

export default ReplyBox