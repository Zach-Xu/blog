import React, { useEffect, useMemo, useRef, useState } from 'react'
import Wave from '../layout/wave'
import { ArrowPathIcon, CalendarDaysIcon, ChatBubbleOvalLeftEllipsisIcon, EyeIcon, ListBulletIcon, PencilIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ClockIcon, HandThumbUpIcon, TagIcon } from '@heroicons/react/24/solid'
import Markdown from '../components/markdown/markdown'

import '../styles/markdown-navbar.css'
import MarkdownNav from '../components/markdown/md-nav'
import { InformationCircleIcon, LinkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CommentList from '../components/article-details/commen-list'

import { articleService } from '../services/resources/article-service'
import Loading from '../components/loading/loading'
import ReplyBox from '../components/article-details/reply-box'
import Tag from '../components/commons/tag'
import { useMutation, useQuery } from '@tanstack/react-query'

const countWords = (content: string) => {
  const words = content.split(' ').length
  if (words > 1000) {
    return `${(words / 1000).toFixed(1)} K`
  }
  return words
}

const getReadTime = (wordsCount: number | string) => {
  if (typeof wordsCount === 'string') {
    wordsCount = parseFloat(wordsCount) * 1000
  }
  const time = Math.ceil(wordsCount / 238)
  return time <= 1 ? '1 min' : `${time} mins`
}

const ArticleDetails = () => {

  const markdownRef = useRef<HTMLDivElement>(null)

  const { articleId } = useParams()

  const navigate = useNavigate()

  if (!articleId || isNaN(Number(articleId))) {
    navigate('/not-found')
    return null
  }

  const { data: article } = useQuery({
    queryKey: ['articleDetails', articleId],
    queryFn: () => articleService.getArticleDetails(articleId)
  })

  const { mutate } = useMutation({
    mutationKey: ['articleViewCount', { articleId }],
    mutationFn: () => articleService.updateArticleViewCount(articleId)
  })

  const wordsCount = useMemo(() => {
    return article ? countWords(article.content) : 0
  }, [article])

  const readTime = useMemo(() => {
    return getReadTime(wordsCount)
  }, [wordsCount])

  useEffect(() => {
    mutate()
  }, [articleId])


  return (
    !article ?
      <Loading /> :

      <div className='min-h-screen relative caret-transparent'>
        <div className='h-[70vh] relative  -z-20 '>
          <div style={{ backgroundImage: `url(${article.thumbnail})` }}
            className='h-[70vh] fixed w-full -z-10 bg-image-cover bg-cover bg-no-repeat bg-center flex flex-col text-white  justify-center items-center'>
            <h1 className=' px-6 py-2 rounded-lg text-lg md:text-2xl lg:text-3xl font-bold mb-5'>
              {article.title}
            </h1>
            <div className='grid grid-cols-1 gap-2 md:gap-x-6 lg:gap-x-8 md:grid-cols-2 text-sm md:text-base lg:grid-cols-3 lg:text-lg'>
              <div className='flex items-center space-x-2'>
                <CalendarDaysIcon className='w-4' />
                <span>{`published on ${new Date(article.createdTime).toLocaleDateString()}`}</span>
              </div>
              {
                article.modifiedOn
                &&
                <div className='flex items-center space-x-2'>
                  <ArrowPathIcon className='w-4' />
                  <span>{`updated on ${new Date(article.modifiedOn).toLocaleDateString()}`}</span>
                </div>
              }
              <div className='flex items-center space-x-2'>
                <EyeIcon className='w-4' />
                <span>{`${article.viewCount} views`}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <PencilIcon className='w-4' />
                <span>{`${wordsCount} words`} </span>
              </div>
              <div className='flex items-center space-x-2'>
                <ClockIcon className='w-4' />
                <span>{`${readTime} read`}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <ListBulletIcon className='w-4' />
                <span>{article.category.name}</span>
              </div>
            </div>
          </div>
          <Wave opacity='medium' />
        </div>

        {/* Article Content */}
        <div className='bg-[#222]  min-h-[30vh] text-gray-300'>
          <div className='flex justify-center xl:w-[72.5rem] mx-auto lg:space-x-4'>
            {/* Left Container */}
            <div className='min-w-0 w-0 flex-1 shadow-around-hover rounded-xl p-6 md:p-8 lg:p-10 lg:w-[calc(100%-18.75rem)]'>
              <div ref={markdownRef} >
                <Markdown content={article.content} />
              </div>
              <div className='mt-6 space-y-6'>
                {/* Tag */}
                {
                  article.tags && article.tags.length > 0
                  &&
                  <div className='flex space-x-2 flex-nowrap'>
                    {
                      article.tags.map(tag => (
                        <Tag key={tag.id} tag={tag} />
                      ))
                    }
                  </div>
                }

                {/* Like button */}
                {/* To be implemented */}
                {/* <div className='flex justify-center md:my-8 text-xs md:text-sm'>
                  <button className='flex items-center justify-between rounded-lg bg-gray-300 py-1 px-3 space-x-2 text-black'>
                    <HandThumbUpIcon className='w-4' />
                    <span>Like</span>
                    <span>123</span>
                  </button>
                </div> */}
                {/* Copyright */}
                <div className='bg-[#363636] rounded-xl px-6 md:px-10 text-xs md:text-sm py-5 space-y-4'>
                  <div className='flex space-x-2'>
                    <UserCircleIcon className='w-4' />
                    <p>Author: Zach</p>
                  </div>
                  <div className='flex space-x-2'>
                    <LinkIcon className='w-4' />
                    <p>{`Link: http://localhost:5173/article/${article.id}`}</p>
                  </div>
                  <div className='flex space-x-2'>
                    <InformationCircleIcon className='w-4' />
                    <p>Copyright: All articles on this site are licensed under CC BY-NC-SA 4.0 unless otherwise noted. </p>
                  </div>
                </div>
                {/* Previous and next article */}
                <div className=' rotate-0 text-white md:flex md:flex-row rounded-xl font-bold overflow-hidden text-xs md:text-sm'>
                  {
                    article.previousArticle &&
                    <div className='flex flex-col md:w-1/2 relative z-0 py-6 px-6 space-y-10 bg-cover bg-image-cover hover:before:opacity-80 before:transition-opacity before:delay-100' style={{ backgroundImage: `url(${article.previousArticle.thumbnail})` }}>
                      <span>Previous article</span>
                      <Link to={`/article/${article.previousArticle.id}`} className='text-lg'>
                        {article.previousArticle.title}
                      </Link>
                    </div>
                  }
                  {
                    article.nextArticle &&
                    <div className='flex flex-col md:w-1/2 relative z-0  py-6 px-6 space-y-10 bg-cover bg-image-cover hover:before:opacity-80 before:transition-opacity before:delay-100' style={{ backgroundImage: `url(${article.nextArticle.thumbnail})` }}>
                      <span>Next article</span>
                      <Link to={`/article/${article.nextArticle.id}`} className='text-lg'>
                        {article.nextArticle.title}
                      </Link>
                    </div>
                  }
                </div>
                {/* Comment */}
                {
                  <div>
                    <div className='flex items-center font-bold space-x-2 md:text-lg ml-2'>
                      <ChatBubbleOvalLeftEllipsisIcon className='w-6' />
                      <h4>Comment</h4>
                    </div>
                    <ReplyBox allowedComment={article.allowedComment} rootCommentId={-1} articleId={parseInt(articleId)} />
                    {
                      article.allowedComment && <CommentList articleId={parseInt(articleId)} />
                    }
                  </div>
                }

              </div>
            </div>
            {/* Right Container */}
            {/* SideNar on large screen  */}
            <div className='hidden lg:block lg:w-[18rem] '>
              <div className='sticky top-[4.5rem] shadow-around-hover rounded-xl  py-4 '>
                <MarkdownNav markdownRef={markdownRef} />
              </div>
            </div>
          </div>
        </div>
      </div>

  )
}

export default ArticleDetails