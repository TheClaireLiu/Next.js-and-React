'use server';

import {saveMeal} from "@/lib/meals";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

function isInvalidText(text){
  return !text || text.trim() === '';
}

export async function shareMeal(prevState,formData){

  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions:formData.get('instructions'),
    image:formData.get('image'),
    creator:formData.get('name'),
    creator_email:formData.get('email')
  };

  if(isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0
  ){
    return{
      message:'Invalid Input.'
    }
  }

  // console.log(meal);
  await saveMeal(meal);
  // re-validate the cash that belongs to a certain path
  // revalidatePath('/meals');
  //重定向页面
  redirect('/meals');
}