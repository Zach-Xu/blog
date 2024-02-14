import React, { Fragment, useState } from 'react'
import ReplyBox from './reply-box'
import { commentService } from '../../services/resources/comment-service'
import CommentItem from './comment-item'
import { ChatBubbleOvalLeftEllipsisIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'
import { useInfiniteQuery } from '@tanstack/react-query'




interface Props {
    articleId: number
}

const CommentList = ({ articleId }: Props) => {

    const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
        queryKey: ['articleComments', articleId],
        queryFn: ({ pageParam }) => commentService.getComments({ articleId, pageNum: pageParam, pageSize: 5 }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParams) => {
            const { totalPages } = lastPage
            return lastPageParams + 1 >= totalPages ? undefined : lastPageParams + 1
        }
    })



    return (
        <>
            {/* Comment List */}
            {
                data && data.pages.map((group, i) => (
                    <Fragment key={i}>
                        {
                            group.rows.map(comment => (
                                <CommentItem key={comment.commentId} comment={comment} />
                            ))
                        }
                    </Fragment>
                ))

            }
            {
                hasNextPage &&
                <div className='flex justify-center mt-6'>
                    <button className='bg-gradient-pink text-black text-sm p-2 px-4 rounded-md'
                        onClick={() => {
                            fetchNextPage()
                        }}
                        disabled={isFetching}
                    >
                        Load more
                    </button>
                </div>
            }
        </>

    )
}

export default CommentList