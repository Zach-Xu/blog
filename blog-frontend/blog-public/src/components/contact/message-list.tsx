import { useInfiniteQuery } from '@tanstack/react-query'
import React, { Fragment } from 'react'
import { commentService } from '../../services/resources/comment-service'
import MessageItem from './message-item'

const MessageList = () => {

    const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
        queryKey: ['contactComments'],
        queryFn: ({ pageParam }) => commentService.getContactComments({ pageNum: pageParam, pageSize: 5 }),
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
                                <MessageItem key={comment.commentId} comment={comment} />
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

export default MessageList