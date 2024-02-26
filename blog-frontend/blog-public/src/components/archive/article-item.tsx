import React from 'react'
import { Link } from 'react-router-dom'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

interface Props {
    article: Article
}

const ArticleItem = ({ article }: Props) => {
    return (
        <div className='flex relative archive-circle-md pl-5'>
            <Link to={`/article/${article.id}`} className='w-[120px] h-[120px]  rounded-2xl overflow-hidden'>
                <img src={article.thumbnail} alt="article image" className='w-full h-full object-cover hover:scale-110 hover-image ' />
            </Link>

            <div className='flex flex-col justify-center space-y-2 pl-4'>
                <div className='flex space-x-2'>
                    <CalendarDaysIcon className='w-6' />
                    <div>{new Date(article.createdTime).toLocaleDateString()}</div>
                </div>
                <div>{article.title}</div>
            </div>
        </div>
    )
}

export default ArticleItem