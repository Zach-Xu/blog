import Wave from '../layout/wave'

import ArticleList from '../components/archive/article-list'
import useArticleStore from '../store/article-store'
import { articleService } from '../services/resources/article-service'
import { useQuery } from '@tanstack/react-query'

const Archive = () => {
    const pageNum = useArticleStore(state => state.pageNum)
    const { data } = useQuery({
        queryKey: ['archiveArticle', pageNum],
        queryFn: () => articleService.getArticles({ pageNum: pageNum - 1 })
    })

    return (
        <div className='min-h-screen  relative caret-transparent'>
            <div className='h-[70vh] relative -z-20'>
                <div className='h-[70vh] fixed w-full bg-archive bg-image-cover bg-cover bg-no-repeat bg-center text-white flex justify-center items-center'>
                    <h1 className='font-bold text-4xl md:text-5xl '>
                        Archive
                    </h1>
                </div>
                <Wave opacity='medium' />
            </div>

            {/* Main Container */}
            <div className='bg-[#222] min-h-[30vh] relative z-10 p-4 text-gray-300'>
                <div className='shadow-around-hover rounded-lg p-6 md:p-8 lg:p-10 lg:w-[60.5rem] mx-auto'>
                    <div className='relative ml-[10px] pb-[20px] pl-[20px] text-[1.5rem] archive-circle-lg archive-pipe'>
                        {`Article Overview ${data ? ' - ' + data.total : ''}`}
                    </div>
                    {
                        data &&
                        <ArticleList articles={data.rows} totalPages={data.totalPages} />
                    }
                </div>
            </div>
        </div>

    )
}

export default Archive