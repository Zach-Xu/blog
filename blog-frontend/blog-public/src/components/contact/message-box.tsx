import React, { useState } from 'react'
import useUserStore from '../../store/user-store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentService } from '../../services/resources/comment-service'

interface Props {
    rootCommentId: number
    toCommentId?: number
    placeholder?: string
}

const MessageBox = ({ rootCommentId = -1, toCommentId, placeholder }: Props) => {
    const [content, setContent] = useState('')

    const user = useUserStore(state => state.user)

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationKey: ['postContactComment'],
        mutationFn: () => commentService.postContactComment({
            content,
            rootCommentId,
            ...(toCommentId ? { toCommentId } : {})
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['contactComments']
            })
            setContent('')
            if (!user && data) {
                localStorage.setItem('tempUsername', data.tempUsername!)
            }

        }
    })

    const postMessage = (event: React.FormEvent) => {
        event.preventDefault()
        mutate()
    }

    return (
        <form className='flex w-full h-[50px] caret-white mt-4' onSubmit={postMessage}>
            {
                user
                &&
                <img src={user.avatar || '/assets/default-user.jpg'} alt="user avatar" className='h-full object-cover rounded-full mr-2' />
            }
            <textarea required name="" value={content} onChange={e => setContent(e.target.value)}
                className={` ${content.length > 0 ? '' : 'leading-[48px]'} resize-none flex-1 border border-[#444] text-sm  bg-[#21252b]  px-2 rounded-md focus:outline-none`}
                placeholder={placeholder || 'Leave a message here'}
            >
            </textarea>
            <button type='submit' className={`bg-gradient-pink rounded-md py-2 px-3 text-black ml-2`}>
                Reply
            </button>
        </form>
    )
}

export default MessageBox