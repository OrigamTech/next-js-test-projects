"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

interface IProps {
  text: string;
  trim: any;
}

const shareMeal = async (prevState: any,formData: any) => {
  const isInvalidText = (text: IProps) => {
    return !text || text.trim() === "";
  };

  const meal = {
    title: formData.get("title"),
    image: formData.get("image"),
    summary: formData.get("summary"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    instructions: formData.get("instructions"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    isInvalidText(meal.instructions) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {message: "invalid input"};
  }

  await saveMeal(meal);
  //npm install --legacy-peer-deps next@rc react@rc react-dom@rc
  revalidatePath("/meals")
  redirect("/meals");
};

export default shareMeal;
