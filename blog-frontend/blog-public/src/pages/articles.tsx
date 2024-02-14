import React, { useEffect, useMemo, useState } from 'react'
import Wave from '../layout/wave'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { articleService } from '../services/resources/article-service'
import LazyLoadImage from '../components/home/featured-articles/lazy-load-image'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { FlagIcon } from '@heroicons/react/24/solid'
import Tag from '../components/commons/tag'
import Pagination from '../components/archive/pagination'


const Article = () => {

    const [pageNum, setPageNum] = useState(1)

    const [searchParams] = useSearchParams()
    const location = useLocation()

    const { tagName, categoryName } = location.state || {}

    const navigate = useNavigate()

    const categoryId = searchParams.get('categoryId')
    const tagId = searchParams.get('tagId')

    const title = useMemo(() => {
        let part = categoryId ? 'Category' : 'Tag'
        let filter = ''
        if (tagName) {
            filter = tagName
        }
        if (categoryName) {
            filter = categoryName
        }

        return `${part} ${filter === '' ? '' : '- ' + filter}`

    }, [categoryId, tagId])

    if (isNaN(Number(categoryId)) || isNaN(Number(tagId))) {
        navigate('/not-found')
        return null
    }
    console.log('title', title)


    const { data } = useQuery({
        queryKey: ['searchArticles', categoryId, tagId, pageNum],
        queryFn: () => articleService.getArticles({
            pageNum: pageNum - 1,
            pageSize: 6,
            categoryId: categoryId ? parseInt(categoryId) : undefined,
            tagId: tagId ? parseInt(tagId) : undefined
        })
    })


    return (
        <div className='min-h-screen  relative caret-transparent'>
            <div className='h-[70vh] relative -z-20'>
                <div className='h-[70vh] fixed w-full bg-archive bg-image-cover bg-cover bg-no-repeat bg-center text-white flex justify-center items-center'>
                    <h1 className='font-bold text-4xl md:text-5xl '>
                        {title}
                    </h1>
                </div>
                <Wave opacity='medium' />
            </div>

            {/* Main Container */}
            <div className='bg-[#222] min-h-[30vh] relative z-10 p-4 text-gray-300'>
                <div className='shadow-around-hover rounded-lg p-6 md:p-8 lg:p-10 lg:w-[60.5rem] mx-auto'>
                    <div className='grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        {
                            data && data.rows.map(article => (
                                <div className='flex flex-col text-gray-300 shadow-around-hover rounded-lg overflow-hidden'>
                                    <LazyLoadImage src={article.thumbnail} alt="article cover image" className='h-[12rem] w-full object-cover' />
                                    <div className='flex flex-col pl-4 pt-2 flex-1'>
                                        <h2 className='text-lg font-bold'>{article.title}</h2>
                                        <div className='flex justify-between mt-2 mr-4'>
                                            <div className='flex space-x-2 items-center'>
                                                <CalendarDaysIcon className='h-5 w-5' />
                                                <span>{new Date(article.createdTime).toLocaleDateString()}</span>
                                            </div>

                                            <Link to={`/articles?categoryId=${article.category.id}`} state={{ categoryName: article.category.name }}
                                                className='flex space-x-2 items-center text-orange-600'
                                            >
                                                <FlagIcon className='h-4 w-4' />
                                                <span>{article.category.name}</span>
                                            </Link>

                                        </div>
                                        <div className='flex flex-1 flex-wrap items-end pt-4'>
                                            {
                                                article.tags && article.tags.map((tag) => (
                                                    <div key={tag.id} className='mr-2 mb-2'>
                                                        <Tag tag={tag} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                    {
                        (data?.totalPages || 1) > 1 &&
                        <div className='mt-6 md:mt-8 lg:mt-10'>
                            <Pagination total={data?.totalPages || 1} currentPage={pageNum} updatePageNumber={setPageNum} />
                        </div>
                    }
                </div>

            </div>
        </div >

    )
}



export default Article