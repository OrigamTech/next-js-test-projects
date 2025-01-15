import { notFound } from "next/navigation";
import Link from "next/link";
import { DUMMY_NEWS } from "@/dummyNews";

const NewsDetailPage = async ({ params }: any) => {
  const { slug } = await params;
  const newsItems = DUMMY_NEWS.find((newsItem) => newsItem.slug === slug);
  // console.log(`/images/news/${newsItems?.image}`);

  if (!newsItems) {
    notFound();
  }
  return (
    <article className="max-w-5xl mx-auto">
      <header className="w-full">
        <h1>{newsItems?.title}</h1>
        <Link href={`/news/${newsItems.slug}/image`}>
          <img
            className="w-60 inline-block"
            src={`/images/news/${newsItems.image}`}
            alt={newsItems.title}
          />
        </Link>
        <div className="flex mt-5">
        <p className="mr-1">date :</p>
        <time className="" dateTime={newsItems?.date}>
          {newsItems?.date}
        </time>
        </div>
      </header>
      <p className="mt-5">{newsItems?.content}</p>
      <div>
        <Link href="/news">Back</Link>
      </div>
    </article>
  );
};

export default NewsDetailPage;
