import React from 'react'
import ArticleCard from './article-card'
import { homeService } from '../../../services/resources/home-service'
import { useQuery } from 'react-query'
const FeaturedArticles = () => {

    const { data: articles } = useQuery('featuredArticles', homeService.getFeaturedArticles)

    return (
        <div className='lg:w-[calc(100%-18.75rem)] space-y-5 mx-2 lg:mr-0'>
            {/* Article Card */}
            {
                articles && articles.length > 0 &&
                articles.map((article, idx) => (
                    <ArticleCard key={article.id} article={article} reverse={idx % 2 !== 0} />
                ))
            }
        </div>
    )
}

export default FeaturedArticles