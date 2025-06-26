import classes from './loading.module.css';
// app/meals/loading-out.js
export default function MealsLoadingPage(){
  return <p className={classes.loading}>Fetching meals...</p>
}