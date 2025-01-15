//this [[...filter]] is the catch all feature that defines one page that will be active for different paths

import Link from "next/link";

import NewsList from "@/component/news/newsList";
import {
  getAvailableNewsMonth,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";

const FilteredNewsPage = async ({ params }: any) => {
  const { year } = await params;
  // console.log(filter);
  // const news = getNewsForYear(newsYear);
  let links = getAvailableNewsYears();

  const selectedYear = year?.[0];
  const selectedMonth = year?.[1];

  let news;

  if (selectedYear && !selectedMonth) {
    news = getNewsForYear(selectedYear);
    links = getAvailableNewsMonth(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  let newsContent = <p className="mt-4">Please select your desired date!</p>; //fallback if no date was selected

  if (news && news.length > 0) {
    newsContent = <NewsList newsData={news} />;
  }

  if (
    (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedMonth && !getAvailableNewsMonth(selectedYear).includes(+selectedMonth))
  ) // we added the "+" to the selectedYear and the selectedMonth because the getAvailableNewsMonth and getAvailableNewsYears functions accept numbers and the selectedMonth-Year without the "+" is of type string 
   {
    // throw new Error("invalid filter");
  }

  return (
    <>
      <header className="">
        <nav className="">
          <ul className="flex gap-5">
            {links?.map((link: any) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link} className="">
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
};

export default FilteredNewsPage;
