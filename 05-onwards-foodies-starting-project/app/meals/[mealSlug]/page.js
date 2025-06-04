import Image from 'next/image';

import { getMeal } from '@/lib/meals';
import classes from './page.module.css';
export default function MealDetailsPage({params}){

  const meal = getMeal(params.mealSlug)

  return <>
    <header className={classes.header}>
      <div className={classes.image}>
        <Image fill/>
      </div>

      <div className={classes.headerText}>
        <h1>{meal.title}</h1>
        <p className={classes.creator}>
          by <a href={ `mailto:`}>NAME</a>
        </p>
        <p className={classes.summary}>SUMMARY</p>
      </div>
    </header>
    <main>
      <p
        className={classes.instructions}
        dangerouslySetInnerHTML={{
          __html: '...',
        }}
      ></p>
    </main>
  </>;
}
