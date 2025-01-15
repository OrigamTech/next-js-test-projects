import Link from "next/link";
import MealsGrid from "@/components/meals/mealsGrid";
import GetMeals from "../../lib/meals";
import { Suspense } from "react";
import classes from "./page.module.css";

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

const Meals = async () => {
  // await new Promise((resolve) => {setTimeout(resolve,2000)})
  const meals = await GetMeals();
  return <div><MealsGrid meals={meals} /></div>;
};

const MealsPage = () => {
  return (
    <>
      <header className="flex flex-col">
        <h1> meals created by you</h1>
        <p>
          choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p></p>
        <Link className="" href="/meals/share">
          <p>Share your favorite recipe!</p>
        </Link>
      </header>
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Meals />
        </Suspense>
        <div className="flex gap-4">
          <Link href="/meals/share">Share Your Recipe With Us!</Link>
          <Link href="/">Back to the main page</Link>
        </div>
      </main>
    </>
  );
};

export default MealsPage;
