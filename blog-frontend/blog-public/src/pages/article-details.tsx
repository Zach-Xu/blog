import React, { useEffect, useRef, useState } from 'react'
import Wave from '../layout/wave'
import { ArrowPathIcon, CalendarDaysIcon, EyeIcon, ListBulletIcon, PencilIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ClockIcon, HandThumbUpIcon, TagIcon } from '@heroicons/react/24/solid'
import Markdown from '../components/markdown/markdown'

import '../styles/markdown-navbar.css'
import MarkdownNav from '../components/markdown/md-nav'
import { InformationCircleIcon, LinkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import CommentList from '../components/article-details/commen-list'

const ArticleDetails = () => {

  const [mdContent, setMdContent] = useState('')

  const markdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/assets/api-doc.md')
      .then(res => res.text())
      .then(text => setMdContent(text))
  }, [])


  return (
    <div className='min-h-screen  relative caret-transparent'>
      <div className='h-[70vh] relative  -z-20 '>
        <div className='h-[70vh] fixed w-full -z-10 bg-archive bg-image-cover bg-cover bg-no-repeat bg-center flex flex-col text-white  justify-center items-center'>
          <h1 className=' px-6 py-2 rounded-lg text-lg md:text-2xl lg:text-3xl font-bold mb-5'>
            Test Article
          </h1>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2 text-sm md:text-base lg:grid-cols-3 lg:text-lg'>
            <div className='flex items-center space-x-2'>
              <CalendarDaysIcon className='w-4' />
              <span>published on 2023-12-06</span>
            </div>
            <div className='flex items-center space-x-2'>
              <ArrowPathIcon className='w-4' />
              <span>updated on 2024-01-12</span>
            </div>
            <div className='flex items-center space-x-2'>
              <EyeIcon className='w-4' />
              <span>23 views</span>
            </div>
            <div className='flex items-center space-x-2'>
              <PencilIcon className='w-4' />
              <span>2.7K words</span>
            </div>
            <div className='flex items-center space-x-2'>
              <ClockIcon className='w-4' />
              <span>5 mins read</span>
            </div>
            <div className='flex items-center space-x-2'>
              <ListBulletIcon className='w-4' />
              <span>Algorithm</span>
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
              <Markdown content={mdContent} />

            </div>
            <div className='mt-6 space-y-6'>
              {/* Tag */}
              <div className='flex justify-between '>
                <div className='flex items-center bg-[#2d2e2f] py-1 px-2 text-xs md:text-sm space-x-2 text-blue-300 rounded-md hover:text-orange-600 cursor-pointer'>
                  <TagIcon className='w-4' />
                  <span>Lorem category</span>
                </div>
              </div>
              {/* Like button */}
              <div className='flex justify-center md:my-8 text-xs md:text-sm'>
                <button className='flex items-center justify-between rounded-lg bg-gray-300 py-1 px-3 space-x-2 text-black'>
                  <HandThumbUpIcon className='w-4' />
                  <span>Like</span>
                  <span>123</span>
                </button>
              </div>
              {/* Copyright */}
              <div className='bg-[#363636] rounded-xl px-6 md:px-10 text-xs md:text-sm py-5 space-y-4'>
                <div className='flex space-x-2'>
                  <UserCircleIcon className='w-4' />
                  <p>Author: Zach</p>
                </div>
                <div className='flex space-x-2'>
                  <LinkIcon className='w-4' />
                  <p>Link: http://localhost:5173/article/1</p>
                </div>
                <div className='flex space-x-2'>
                  <InformationCircleIcon className='w-4' />
                  <p>Copyright: All articles on this site are licensed under CC BY-NC-SA 4.0 unless otherwise noted. </p>
                </div>
              </div>
              {/* Last and next article */}
              <div className='bg-[#363636] rotate-0 text-white md:flex md:flex-row rounded-xl font-bold overflow-hidden text-xs md:text-sm'>
                <div className='flex flex-col flex-1 relative z-0 py-6 px-6 space-y-10 bg-cover bg-image-cover hover:before:opacity-80 before:transition-opacity before:delay-100' style={{ backgroundImage: `url('/assets/bg1.png')` }}>
                  <span>Last article</span>
                  <Link to={`/article/123`} className='text-lg'>
                    Test Article
                  </Link>
                </div>
                <div className='flex flex-col flex-1  relative z-0  py-6 px-6 space-y-10 bg-cover bg-image-cover hover:before:opacity-80 before:transition-opacity before:delay-100' style={{ backgroundImage: `url('/assets/bg2.png')` }}>
                  <span>Next article</span>
                  <Link to={`/article/123`} className='text-lg'>
                    Project Introduction
                  </Link>
                </div>
              </div>
              {/* Comment */}
              <CommentList />
            </div>
          </div>
          {/* Right Container */}
          {/* SideNar on large screen  */}
          <div className='hidden lg:block lg:w-[18rem] '>
            <div className='sticky top-[4.5rem] shadow-around-hover rounded-xl  py-4 '>
              {
                markdownRef.current && <MarkdownNav markdownRef={markdownRef} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ArticleDetails