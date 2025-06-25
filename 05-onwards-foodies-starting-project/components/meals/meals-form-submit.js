'use client'
import {useActionState} from "react";

// 一个空的处理函数（暂时占位）
async function dummyAction(_, __) {
  return {};
}
export default function MealsFormSubmit(){
  //use object destructuring to pull out a property from
  const [_, __, pending] = useActionState(dummyAction, {});

  return <button disabled={pending}>
    {pending ? "Submitting..." : "Share Meal"}
  </button>
}