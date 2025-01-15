import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAccessToken } from "@/utils/sessionTokenAccessor";
import NewsList from "@/component/news/newsList";
import SigninButton from "@/component/signinButton";

type News = {
  id: string;
  slug: string;
  title: string;
  content: string;
  date: string;
  image: string;
}

type session = Session & {
  roles?:string[];
}

export const getAllNews = async (): Promise<News[]> => {
  const url = `${process.env.BACKEND_API_URL}/news`;

  const accessToken = await getAccessToken();
  // console.log('Access Token:',accessToken);
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch data. Status: " + response.status);
  }
};

const NewsPage = async () => {
  const session:session |null = await getServerSession(authOptions);
  // console.log("Session:", session); // Log session


  //*****how can i set those roles in the keycloak??*****
  // if (!session || !session.roles?.includes("viewer"))
  if (!session) {
    return (
      <div>
        <SigninButton />
      </div>
    );
  } else {
  }

  let news: News[] = [];
  try {
    news = await getAllNews();
    return (
      <main className="max-w-5xl mx-auto">
        <div className="grid grid-cols-3">
          <div className="col-span-3">
            <NewsList newsData={news} />
          </div>
        </div>
      </main>
    );
  } catch (err) {
    console.error(err);
  }
};

export default NewsPage;

// import Link from "next/link";
// // import { DUMMY_NEWS } from "@/dummyNews";
// import NewsList from "@/component/news/newsList";
// import { useEffect, useState } from "react";
// import { useSession, signIn } from "next-auth/react";

// const { data: session, status } = useSession(); //get the session status
// const [error, setError] = useState<string | undefined>(undefined);
// const [isLoading, setIsLoading] = useState(false);
// const [news, setNews] = useState(null);
// useEffect(() => {
//   if (status === "authenticated") {
//     const fetchNews = async () => {
//       setIsLoading(true);
//       const response = await fetch(`${process.env.BACKEND_API_URL}/news`);
//       const data = await response.json();

//       if (!response.ok) {
//         setError("failed to fetch");
//         setIsLoading(false);
//       }
//       return setNews(data), setIsLoading(false);
//     };
//     fetchNews();
//   }
// }, [status]);

// if (status === "loading") {
//   return <div>Loading...</div>;
// }

// if (status === "unauthenticated") {
//   return (
//     <div className="max-w-5xl mx-auto">
//       <p className="text-red-500">
//         These contents are restricted. Please{" "}
//         <button
//           className="text-blue-500 underline"
//           onClick={() => signIn("keycloak")}
//         >
//           sign up or log in
//         </button>{" "}
//         to view them.
//       </p>
//       <Link href="/">Back</Link>
//     </div>
//   );
// }

// if (error) {
//   return <div>Error: {error}</div>;
// }

// let newsContent;

// if (news) {
//   newsContent = <NewsList newsData={news} />;
// }

// return (
//   <div className="max-w-5xl mx-auto">
//     <div className="grid grid-cols-3">
//       <div className="col-span-3  ">
//         {isLoading ? <p>Loading...</p> : newsContent}
//       </div>
//     </div>
//     <Link href="/">Back</Link>
//   </div>
// );
// }
