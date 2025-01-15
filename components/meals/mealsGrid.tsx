import { list } from "postcss";
import MealItem from "./mealItem";

import React from "react";

interface IProps{
    meals: any
}
const MealsGrid = ({ meals }: IProps) => {
  return (
    <>
      <ul>
        {meals.map((meal:any) =>(<li key={meal.id}>
            <MealItem {...meal}/>
        </li>))}
      </ul>
    </>
  );
};

export default MealsGrid;
