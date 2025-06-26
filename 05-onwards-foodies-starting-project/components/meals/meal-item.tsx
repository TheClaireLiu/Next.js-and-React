// components/meals/meal-item.tsx
import Image from "next/image";
import Link from "next/link";
import classes from './meal-item.module.css';
import { StoredMeal } from "@/lib/meals";

export default function MealItem(meal: StoredMeal) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/*<Image*/}
          {/*  src={`https://claire-nextjs-demo-users-image.s3.amazonaws.com/${meal.image}`}*/}
          {/*  alt={meal.title}*/}
          {/*  width={300}*/}
          {/*  height={200}*/}
          {/*/>*/}

          <Image
            src={`https://claire-nextjs-demo-users-image.s3.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill // 👈 让图片自动填满父容器
            style={{ objectFit: 'cover' }} // 👈 裁切而不拉伸
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </div>
        <div className={classes.headerText}>
          <h2>{meal.title}</h2>
          <p>by {meal.creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{meal.summary}</p>
        <div className={classes.actions}>
        <Link href={`/meals/${meal.slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}