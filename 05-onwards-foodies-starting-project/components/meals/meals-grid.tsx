// meals-grid.tsx
import MealItem from "@/components/meals/meal-item";
import classes from './meals-grid.module.css';
import { StoredMeal } from "@/lib/meals";

type MealGridProps = {
  meals: StoredMeal[];
};

// meals-grid.tsx
export default function MealsGrid({ meals }: MealGridProps) {
  return (
    <div className={classes.meals}>
      {meals.map((meal) => (
        <MealItem key={meal.id ?? meal.slug} {...meal} />
      ))}
    </div>
  );
}