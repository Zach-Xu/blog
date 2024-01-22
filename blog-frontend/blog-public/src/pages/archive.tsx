import Wave from '../layout/wave'
import ArticleItem from '../components/archive/article-item'
import Pagination from '../components/archive/pagination'

const Archive = () => {
    return (
        <div className='min-h-screen  relative caret-transparent'>
            <div className='h-[70vh] relative -z-20'>
                <div className='h-[70vh] fixed w-full bg-archive bg-image-cover bg-cover bg-no-repeat bg-center text-white flex justify-center items-center'>
                    <h1 className='font-bold text-3xl '>
                        Archive
                    </h1>
                </div>
                <Wave opacity='medium' />
            </div>

            {/* Main Container */}
            <div className='bg-[#222] relative z-10 p-4 text-gray-300'>
                <div className='shadow-around-hover rounded-lg p-6 md:p-8 lg:p-10 lg:w-[60.5rem] mx-auto'>
                    <div className='relative ml-[10px] pb-[20px] pl-[20px] text-[1.5rem] archive-circle-lg archive-pipe'>
                        Article Overview - 4
                    </div>
                    {/* Article List */}
                    <div className='ml-[10px] pl-[20px] border-l-2 border-blue-300 space-y-5 mb-8'>
                        {/* Article Item */}
                        <ArticleItem />
                        <ArticleItem />
                        <ArticleItem />
                    </div>
                    <Pagination total={200} current={1} />
                </div>
            </div>
        </div>

    )
}

export default Archive