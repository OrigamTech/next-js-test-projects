import { DUMMY_NEWS } from "@/dummyNews";

export const getAllNews = () => {
  return DUMMY_NEWS;
};

export const getLatesNews = () => {
  return DUMMY_NEWS.slice(0, 3);
};

export const getAvailableNewsYears: any = () => {
  const years = new Set(
    DUMMY_NEWS.map((news: any) => {
      return new Date(news.date).getFullYear();
    })
  );
  return Array.from(years).sort((a: any, b: any) => a - b);
};

export const getAvailableNewsMonth: any = (year: any) => {
  const months = new Set(
    DUMMY_NEWS.filter(
      (news: any) => new Date(news.date).getFullYear() === +year
    ).map((news: any) => new Date(news.date).getMonth() + 1)
  );
  return Array.from(months).sort((a: any, b: any) => a - b);
};

export const getNewsForYear = (year: any) => {
  return DUMMY_NEWS.filter((news: any) => {
    return new Date(news.date).getFullYear() === +year;
  });
};

export const getNewsForYearAndMonth = (year: any, month: any) => {
  return DUMMY_NEWS.filter((news: any) =>{
    const newYear = new Date(news.date).getFullYear();
    const newMonth = new Date(news.date).getMonth() + 1;
    return newYear === +year && newMonth === +month;
  });
};
