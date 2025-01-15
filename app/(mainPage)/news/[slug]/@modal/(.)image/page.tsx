import { notFound } from "next/navigation";
import { DUMMY_NEWS } from "@/dummyNews";
import CloseButton from "@/component/news/closeButton";

const ImagePageInterceptor = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = await params;
  const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === slug);

  if (!newsItem) {
    notFound();
  }
  return (
    <>
      <div className="modal-backdrop fixed top-0 left-0 w-full h-full bg-[rgba(39,39,39,0.85)] flex justify-center items-center">
        <dialog className=" shadow-inner max-w-[50rem] relative" open>
          <div className="flex items-center justify-center mx-auto h-full w-[580px]">
            <div className="absolute top-2 right-2 bg-red-400 flex items-center justify-center mx-auto">
              <CloseButton />
            </div>
            <img
              className="w-full"
              src={`/images/news/${newsItem.image}`}
              alt={newsItem.title}
            />
          </div>
        </dialog>
      </div>
    </>
  );
};

export default ImagePageInterceptor;
