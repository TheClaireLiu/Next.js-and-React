// lib/action.ts
'use server';

import { saveMeal } from '@/lib/meals';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

function isInvalidText(text: string | null): boolean {
  return !text || text.trim() === '';
}

export type ShareMealState = {
  message: string | null;
};

export async function shareMeal(
  _: ShareMealState,
  formData: FormData
): Promise<ShareMealState> {
  const title = formData.get('title');
  const summary = formData.get('summary');
  const instructions = formData.get('instructions');
  const image = formData.get('image') as File | null;
  const creator = formData.get('name');
  const creator_email = formData.get('email');

  if (
    isInvalidText(title as string) ||
    isInvalidText(summary as string) ||
    isInvalidText(instructions as string) ||
    isInvalidText(creator as string) ||
    isInvalidText(creator_email as string) ||
    !creator_email?.toString().includes('@') ||
    !image ||
    image.size === 0
  ) {
    return { message: 'Invalid Input.' };
  }

  const meal = {
    title: title as string,
    summary: summary as string,
    instructions: instructions as string,
    image,
    creator: creator as string,
    creator_email: creator_email as string,
  };

  await saveMeal(meal);
  // revalidatePath('/meals');
  redirect('/meals');
}