import ImageSlideshow from "@/components/images/imageSlideshow";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="flex gap-[25rem] mt-12 mb-12 ml-auto mr-auto w-[90%] max-w-[75rem]">
        <div className="slideshow">
          <ImageSlideshow/>
        </div>
        <div className="flex flex-col items-start">
          <div className="hero">
            <h1>Next Level Food For NextLevel Foodies</h1>
            <p>Taste & Share Food From All Over The World.</p>
          </div>
          <div className="callToAction">
            <Link className="" href="/meals">
              Explore Meals
            </Link>
            <Link className="" href="/community">
              Join The Community
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
