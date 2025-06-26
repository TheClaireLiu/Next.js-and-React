'use client'
import {useFormStatus} from "react-dom";

export default function MealsFormSubmit(){
  //use object destructuring to pull out a property from
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}