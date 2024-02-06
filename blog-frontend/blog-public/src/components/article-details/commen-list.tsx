import { ChatBubbleOvalLeftEllipsisIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import ReplyBox from './reply-box'
import CommentItem from './comment-item'



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

const dummyComments: Comment[] = [
    {
        id: 1,
        username: "User1",
        like: 10,
        content: "This is a dummy comment.",
        date: "2024-01-21",
        children: [
            {
                id: 11,
                username: "User2",
                like: 5,
                toCommentId: 1,
                content: "Nice comment!",
                date: "2024-01-21",
            },
            {
                id: 12,
                username: "User3",
                like: 3,
                toCommentId: 1,
                content: "I agree!",
                date: "2024-01-21",
            },
            {
                id: 13,
                username: "User4",
                like: 7,
                toCommentId: 1,
                content: "Great discussion!",
                date: "2024-01-21",
            },
            {
                id: 14,
                username: "User5",
                like: 2,
                toCommentId: 1,
                content: "Keep it up!",
                date: "2024-01-21",
            },
        ],
    },
    {
        id: 2,
        username: "User6",
        like: 8,
        content: "Another parent comment.",
        date: "2024-01-21",
        children: null,
    },
    {
        id: 3,
        username: "User7",
        like: 15,
        content: "Yet another parent comment.",
        date: "2024-01-21",
        children: null,
    },
]


const CommentList = () => {

    const comments = dummyComments

    return (
        <>
            {/* Comment List */}
            {
                dummyComments.map(item => (
                    <CommentItem key={item.id} comment={item} />
                ))
            }
        </>

    )
}

export default CommentList