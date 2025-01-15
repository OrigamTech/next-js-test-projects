import Link from "next/link";

const NewsList = ({newsData}:any) => {
  return (
    <div>
      <ul className="m-5 grid grid-cols-3 gap-4">
        {newsData.map((dummyNews:any) => (
          <li key={dummyNews.id}>
            <Link href={`/news/${dummyNews.slug}`}>
              <img
                className="w-52"
                src={`/images/news/${dummyNews.image}`}
                alt={dummyNews.title}
              />
              <span>{dummyNews.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
