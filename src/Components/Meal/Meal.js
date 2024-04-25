import React from 'react'
import "./Meal.css"
const Meal = (props) => {
  let {Meals,SetMeals} = props.Meals
  function DeleteMeal(){
    let days = JSON.parse(localStorage.days)
    let types = ["protein","calories","carb","fat"]

    
   function shortcut(type){
    days[props.dayindex].totalNutrients[type] -= props.nutrients[type]
   }

   types.forEach(element => {
    shortcut(element)
   });

    days[props.dayindex].meals.splice(props.index,1)
    localStorage.days = JSON.stringify(days)
    SetMeals(prev => JSON.parse(localStorage.days)[props.dayindex].meals)
  }
  return (
    <div className='Meal'><img src={props.nutrients.img}/><h1>{props.nutrients.name}: {Math.trunc(props.nutrients.size)}g - {Math.trunc(props.nutrients.calories)} Calories - {Math.trunc(props.nutrients.protein)}g Protein - {Math.trunc(props.nutrients.fat)}g Fats - {Math.trunc(props.nutrients.carb)}g Carb </h1> <button onClick={DeleteMeal}> X </button></div>
  )
}

export default Meal