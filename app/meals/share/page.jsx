'use client'

import { useActionState } from "react-dom";
import ImagePicker from "@/components/meals/imagePicker";
import Link from "next/link";
import shareMeal from "@/lib/actions";
import MealFormSubmit from "@/components/meals/mealFormSubmit";
const MealsSharePage = () => {
  const [state, formAction] = useActionState(shareMeal, {message: null});

  return (
    <>
      <header>
        <h1>Share your favorite meal</h1>
      </header>
      <main className=" flex flex-col w-full">
        <form className="flex flex-col " action={formAction}>
          <div className="flex flex-col gap-5 mb-4">
            <p>
              <label htmlFor="name" className="">
                Your name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="text-black p-2"
              />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="text-black p-2"
              />
            </p>
          </div>
          <div className="flex flex-col gap-5 mb-4">
            <p>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="text-black p-2"
              />
            </p>
            <p>
              <label htmlFor="summary">Short summary</label>
              <input
                type="text"
                name="summary"
                id="summary"
                required
                className="text-black p-2"
              />
            </p>
            <p>
              <label htmlFor="instructions">Instructions</label>
              <textarea
                name="instructions"
                id="instructions"
                rows={10}
                required
                className="text-black p-2"
              ></textarea>
            </p>
            <ImagePicker label="Your Image" name="image" />
            {state.message && <p>{state.message}</p>}
            <div className="flex justify-center items-center w-full ">
              <p className="bg-orange-500 w-20">{<MealFormSubmit />}</p>
            </div>
          </div>
        </form>
      </main>
      <p>
        <Link href="/meals">back</Link>
      </p>
    </>
  );
};

export default MealsSharePage;
