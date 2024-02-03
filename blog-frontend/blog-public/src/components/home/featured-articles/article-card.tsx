import { CalendarDaysIcon, EyeDropperIcon, FlagIcon, TagIcon } from '@heroicons/react/24/outline'
import React from 'react'
import LazyLoadImage from './lazy-load-image'
import { useNavigate } from 'react-router-dom'

interface Props {
    reverse: boolean
    article: Article
}

const ArticleCard = ({ article, reverse }: Props) => {

    const navigate = useNavigate()

    const toArticleDetailsPage = (id: number) => {
        navigate(`/article/${id}`)
    }

    return (
        <div className={`flex flex-col group ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} shadow-around hover:shadow-around-hover bg-[#222222] text-[#aaa] rounded-xl overflow-hidden m-3  border-gray-900`}>
            <LazyLoadImage reverse={reverse} src={article.thumbnail} />
            <div className='h-[14rem] md:w-1/2 flex flex-col justify-between space-y-5'>
                {/* Article Info */}
                <div className={`flex ${reverse ? 'justify-start ml-4' : 'justify-end mr-4'} space-x-2 md:mt-4 md:ml-4`}>
                    {
                        article.pinned &&
                        <div className='flex items-center space-x-1 text-[#d96d7f]'>
                            <EyeDropperIcon className='w-4' />
                            <span className=''>Pinned</span>
                        </div>
                    }
                    <div className='flex items-center space-x-1'>
                        <CalendarDaysIcon className='w-4' />
                        <span>{new Date(article.createdTime).toLocaleDateString()}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <TagIcon className='w-4' />
                        <span>{article.category.name}</span>
                    </div>
                </div>
                {/* Article Intro */}

                <h4 className='text-[#d96d7f] text-lg mx-4'>{article.title}</h4>
                <p className='line-clamp-3 mx-4 text-ellipsis'>
                    {article.summary}
                </p>
                <div className={`flex  ${reverse ? 'flex-row pr-4' : 'flex-row-reverse pl-4'}  justify-between items-center text-[#aaa]`}>
                    <div onClick={() => toArticleDetailsPage(article.id)}
                        className={`cursor-pointer text-black bg-gradient-pink text-lg py-2 px-4 ${reverse ? 'rounded-tr-lg' : 'rounded-tl-lg md:rounded-tl-lg md:rounded-tr-none'} `}>
                        more...
                    </div>
                    {
                        article.tags && article.tags.length > 0
                        &&
                        <div className={`flex items-center md:pl-2 `}>
                            <FlagIcon className='w-4 mr-2' />
                            <span>{article.tags[0].tagName}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ArticleCard