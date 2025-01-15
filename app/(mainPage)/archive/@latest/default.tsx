import NewsList from "@/component/news/newsList";
import { getLatesNews } from "@/lib/news"


const LatestNewsPage = () => {
    const latestNews = getLatesNews();

  return (
    <div>
        <h2>Latest News</h2>
        <NewsList newsData={latestNews}/>    
    </div>
  )
}

export default LatestNewsPage