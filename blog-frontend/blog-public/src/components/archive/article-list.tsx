import React from 'react'
import ArticleItem from './article-item'
import Pagination from './pagination'

interface Props {
    articles: Article[]
    totalPages: number
}

const ArticleList = ({ articles, totalPages }: Props) => {


    return (
        <>
            {/* Article List */}
            <div className='ml-[10px] pl-[20px] border-l-2 border-blue-300 space-y-5 mb-8'>
                {/* Article Item */}
                {
                    articles.map(article => (
                        <ArticleItem key={article.id} article={article} />
                    ))
                }

            </div>
            <Pagination total={totalPages} />
        </>
    )
}

export default ArticleList