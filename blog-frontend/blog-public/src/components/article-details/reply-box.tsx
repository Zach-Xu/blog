import React, { useState } from 'react'
import useUserStore from '../../store/user-store'
import useSettingStore from '../../store/setting-store'
import { commentService } from '../../services/resources/comment-service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
    placeholder?: string
    allowedComment?: boolean
    articleId: number
    rootCommentId: number
    toCommentId?: number
}

const ReplyBox = ({ placeholder = 'Leave a comment...', allowedComment = true, articleId, rootCommentId, toCommentId }: Props) => {
    const [content, setContent] = useState('')

    const user = useUserStore(state => state.user)
    const toggleLoginModal = useSettingStore(state => state.toggleLoginModal)

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationKey: ['postComment', articleId],
        mutationFn: () => commentService.postArticleComment({
            articleId,
            content,
            rootCommentId,
            ...(toCommentId ? { toCommentId } : {})
        }),
        onSuccess: () => {
            setContent('')
            queryClient.invalidateQueries({
                queryKey: ['articleComments', articleId]
            })
        }
    })

    const postComment = (event: React.FormEvent) => {
        event.preventDefault()
        if (!user) {
            return toggleLoginModal(true)
        }
        mutate()
    }

    return (
        <form className='flex mt-6 w-full h-[50px] caret-white' onSubmit={postComment}>
            <img src={user && user.avatar || '/assets/default-user.jpg'} alt="user avatar" className='h-full object-cover rounded-full mr-2' />
            <textarea disabled={!allowedComment} required name="" value={content} onChange={e => setContent(e.target.value)}
                className={` ${content.length > 0 ? '' : 'leading-[48px]'} ${allowedComment ? '' : 'cursor-not-allowed placeholder:text-center caret-transparent'}  resize-none flex-1 border border-[#444] text-sm  bg-[#21252b]  px-2 rounded-md focus:outline-none`}
                placeholder={allowedComment ? placeholder : 'Comments are turned off'}>
            </textarea>
            <button type='submit' className={`bg-gradient-pink rounded-md py-2 px-3 text-black ml-2 ${allowedComment ? '' : 'cursor-not-allowed'} `} disabled={!allowedComment}>
                Reply
            </button>
        </form>
    )
}

export default ReplyBox