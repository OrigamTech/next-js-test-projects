import React from "react";
import Image from "next/link";
import Link from "next/link";
import { GetMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

interface IParams {
  params: string;
}

const generateMetaData = async ({ params }: any) => {
  const meal = GetMeal(params.mealSlug);
  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
};

const MealsSlugPages = ({ params }: IParams) => {
  const meal = GetMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return (
    <>
      <header>
        <div>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div>
          <h1>{meal.title}</h1>
          <p>Created by {meal.creator}</p>
          <p>
            Contact{" "}
            <a href={`mailto:${meal.creator_email}`}>{meal.creator_email}</a>{" "}
          </p>
        </div>
        <Link href="/meals">
          <h3>back</h3>
        </Link>
      </header>
    </>
  );
};

export default MealsSlugPages;
