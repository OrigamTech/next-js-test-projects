import Link from "next/link";
import Image from "next/image";

interface IProps {
  image: string;
  title: string;
  creator: string;
  summary: string;
  slug: string;
}
const MealItem = ({ image, title, creator, summary, slug }: IProps) => {
  return (
    <article className="flex flex-col overflow-hidden justify-between h-full">
      <header className="">
        <div className=" h-40 w-40">
          <Image className="object-cover relative" src={image} alt={title} fill />
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div>
        <p>{summary}</p>
        <div>
          <Link className="" href={`/meals/${slug}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default MealItem;
