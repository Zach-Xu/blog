import React from 'react'
import ArticleItem from './article-item'
import Pagination from './pagination'
import useArticleStore from '../../store/article-store'

interface Props {
    articles: Article[]
    totalPages: number
}

const ArticleList = ({ articles, totalPages }: Props) => {

    const currentPage = useArticleStore(state => state.pageNum)
    const updatePageNum = useArticleStore(state => state.updatePageNum)
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
            <Pagination total={totalPages} currentPage={currentPage} updatePageNumber={updatePageNum} />
        </>
    )
}

export default ArticleList