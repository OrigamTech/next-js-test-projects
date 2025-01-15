import { notFound } from 'next/navigation'
import { DUMMY_NEWS } from '@/dummyNews'


const ImagePage = async ({params}:any) => {
    const {slug} = await params 
    const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === slug )

    if(!newsItem){
        notFound()
    }
  return (
    <div className='flex items-center justify-center mx-auto h-full w-[580px]'>
        <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  )
}

export default ImagePage