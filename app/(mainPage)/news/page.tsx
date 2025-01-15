import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAccessToken } from "@/utils/sessionTokenAccessor";
import NewsList from "@/component/news/newsList";
import SigninButton from "@/component/signinButton";

export const getAllNews = async () => {
  const url = `${process.env.BACKEND_API_URL}/news`;

  let accessToken = await getAccessToken();

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  });
  // console.log('Access Token :',accessToken);

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  throw new Error("Failed to fetch data. Status: " + response.status);
};

const NewsPage = async () => {
  const session = await getServerSession(authOptions);
  console.log("news page Session:", session); // Log session

  //*****how can i set those roles in the keycloak??*****
  if (!session) {
    return (
      <div>
        <SigninButton />
      </div>
    );
  } else {
    let news;
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
  }
};

export default NewsPage;
