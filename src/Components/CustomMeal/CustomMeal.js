import React, { createRef } from 'react'
import "./CustomMeal.css"

const CustomMeal = (props) => {
  let {CustomMeals,SetCustomMeals} = props.CustomMeals
  let {Meals,SetMeals} = props.Meals
  let SizeRef = React.createRef()

  function RemoveCustomMeal(){
   let CustomMeals = JSON.parse(localStorage.customMeals)
   CustomMeals.splice(props.index,1)
   localStorage.customMeals = JSON.stringify(CustomMeals)
   SetCustomMeals(prev => CustomMeals)
  }

  function AddMeal(){
   let Size = SizeRef.current.value
   let Me_als = JSON.parse(localStorage.days)
   let types = ["protein","calories","carb","fat"]

 
   Me_als[props.dayindex].meals.push({name:props.nutrients.name , calories:props.nutrients.calories * Size , protein:props.nutrients.protein * Size, carb:props.nutrients.carb * Size, fat:props.nutrients.fat * Size, size:Size})  

   function shortcut(type){
    Me_als[props.dayindex].totalNutrients[type] += props.nutrients[type] * Size
   }

   types.forEach(element => {
    shortcut(element)
   });

   localStorage.days = JSON.stringify(Me_als)
   SetMeals(prev => Me_als[props.dayindex].meals)

  }
  return (
    <div className='CustomMeal'><h1>{props.nutrients.name}:</h1><input placeholder='Size in Grams' ref={SizeRef} type='number' /><button onClick={AddMeal}> Add</button> <button className='RemoveButton' onClick={RemoveCustomMeal}> X </button></div>
  )
}

export default CustomMeal