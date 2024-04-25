import React, { useState } from 'react'
import "./Day.css"
import {CustomMeal,Meal} from "../index"
import { IoIosMenu } from "react-icons/io";



const Day = (props) => {
   const ref = React.createRef()
   const WarnRef = React.createRef()
   const DayCustomizeRef = React.createRef()
   const SearchItemRef = React.createRef() 
   const SearchInputRef = React.createRef() 
   const SearchSizeInput = React.createRef()
   

   let {CustomMeals,SetCustomMeals} = props.CustomMealsState
   let [Meals,SetMeals] = useState(() => JSON.parse(localStorage.days)[props.index].meals)
   let {Days,SetDays} = props.DaysState
   let days = JSON.parse(localStorage.days)
   let custom_Meals = JSON.parse(localStorage.customMeals)
   let [Menu,SetMenu] = useState("none")

   function setdaysf(){
    localStorage.days = JSON.stringify(days)
    localStorage.customMeals = JSON.stringify(custom_Meals)

    SetDays(prev => JSON.parse(localStorage.days) )
    SetCustomMeals(prev => JSON.parse(localStorage.customMeals) )
   }

  async function SearchItem(inputText){
    const fetchData = async () => {
      try {
        const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-app-id': '31d23c1d',
            'x-app-key': 'b3514ef2e54faabe450c8217e9a37b36'
          },
          body: JSON.stringify({
            "query": inputText
          })
        });
        const data = await response.json();
        return data.foods[0]
      } catch (error) {
        console.error('Error:', error);
      }
    };

    let Data = await fetchData()

    if(Data){
      SearchItemRef.current.children[0].src = Data.photo.highres
      SearchItemRef.current.children[1].innerText = Data.food_name
      
      SearchItemRef.current.children[3].onclick = async function(){

      function shortcut(type){
        return Data[type] / Data.serving_weight_grams * SearchItemRef.current.children[2].value
      }

      function shortcut2(type,type2){
          days[props.index].totalNutrients[type] += Data[type2] / Data.serving_weight_grams * SearchItemRef.current.children[2].value
      }

      let FoodMeal = {
        name: Data.food_name,
        calories: shortcut("nf_calories"),
        protein: shortcut("nf_protein"),
        carb: shortcut("nf_total_carbohydrate"),
        fat: shortcut("nf_total_fat"),
        size: SearchItemRef.current.children[2].value,
        img:Data.photo.highres,
      }
      
      let days = JSON.parse(localStorage.days)
      days[props.index].meals.push(FoodMeal)
      shortcut2("protein","nf_protein")
      shortcut2("calories","nf_calories")
      shortcut2("carb","nf_total_carbohydrate")
      shortcut2("fat","nf_total_fat")

      localStorage.days = JSON.stringify(days)
      SetMeals(prev => JSON.parse(localStorage.days)[props.index].meals)
      SearchItemRef.current.style.display = "none"

      }
      SearchItemRef.current.style.display = "flex"
      SearchSizeInput.current.value = ""
      SearchInputRef.current.value = ""
    }
    else{
      SearchItemRef.current.style.display = "none"
    }
   }

   let CustomMealsComponents = CustomMeals.map((nutrients,key) => {
     return <CustomMeal Meals={{Meals,SetMeals}} CustomMeals={{CustomMeals,SetCustomMeals}} nutrients={nutrients} key={key} index={key} dayindex={props.index} />
   })

   let MealsComponents = Meals.map((nutrients,key) => {
    return <Meal nutrients={nutrients} key={key} dayindex={props.index} index={key} Meals={{Meals,SetMeals}} />
  })

    return (
    <div className='Day'>

        <div className='DayResult'>
          <h1>{JSON.parse(localStorage.days)[props.index].day}</h1>  
          <h1>{JSON.parse(localStorage.days)[props.index].date}</h1>  
          <input type="checkbox" checked={Days[props.index].targetNutrients.exercised} readOnly  />
          <input type="checkbox" checked={JSON.parse(localStorage.days)[props.index].targetNutrients.calories >= JSON.parse(localStorage.days)[props.index].totalNutrients.calories } readOnly  />
          <input type="checkbox" checked={JSON.parse(localStorage.days)[props.index].targetNutrients.protein <= JSON.parse(localStorage.days)[props.index].totalNutrients.protein } readOnly  />
          <input type="checkbox" checked={JSON.parse(localStorage.days)[props.index].targetNutrients.carb >= JSON.parse(localStorage.days)[props.index].totalNutrients.carb } readOnly  />
          <input type="checkbox" checked={JSON.parse(localStorage.days)[props.index].targetNutrients.fat >= JSON.parse(localStorage.days)[props.index].totalNutrients.fat } readOnly  />
          <input type="checkbox" checked={!JSON.parse(localStorage.days)[props.index].targetNutrients.includeSugar} readOnly  />
          <h1><IoIosMenu className='Menu' onClick={(e) => {
            if(Menu === "none"){
              SetMenu(prev => "grid");
            }
            else{
              SetMenu(prev => "none");
            }

          }} /></h1>
        </div>
        
        <div ref={DayCustomizeRef} style={{display:Menu}} className='DayCustomize'>
          <div className='DayDetails'>
             <h2>{JSON.parse(localStorage.days)[props.index].day}</h2>
             <h2>{JSON.parse(localStorage.days)[props.index].date}</h2> 

             <div><label>Exercised?</label> <input type="checkbox" defaultChecked={Days[props.index].targetNutrients.exercised}  onChange={(e) => {
              days[props.index].targetNutrients.exercised = e.target.checked
              setdaysf()
             }}/> </div> 

             <div><label>Include Sugar?</label> <input type="checkbox"  defaultChecked={Days[props.index].targetNutrients.includeSugar} onChange={(e) => {
              days[props.index].targetNutrients.includeSugar = e.target.checked
              setdaysf()
             }} /> </div> 

             <div> Calories: <input type='number' placeholder='Calories' defaultValue={JSON.parse(localStorage.days)[props.index].targetNutrients.calories} onChange={(e) => {
                days[props.index].targetNutrients.calories = e.target.value 
                setdaysf()
              }} /></div>

             <div> Protein: <input type='number' placeholder='Protein' defaultValue={JSON.parse(localStorage.days)[props.index].targetNutrients.protein} onChange={(e) => {
                days[props.index].targetNutrients.protein = e.target.value 
                setdaysf()
              }} /></div>

             <div> Fats: <input type='number' placeholder='Fats' defaultValue={JSON.parse(localStorage.days)[props.index].targetNutrients.fat} onChange={(e) => {
                days[props.index].targetNutrients.fat = e.target.value 
                setdaysf()
              }}  /></div>

             <div> Carb: <input type='number' placeholder='Carb' defaultValue={JSON.parse(localStorage.days)[props.index].targetNutrients.carb} onChange={(e) => {
                days[props.index].targetNutrients.carb = e.target.value 
                setdaysf()
              }}  /></div>

          </div>

          <div className='DayMeals'>

            <div className='SearchFoodInputs'>
            <input placeholder='Search Food' ref={SearchInputRef}  />
            <button onClick={(e) => SearchItem(SearchInputRef.current.value)}>Search</button>
            </div>

            <div className='SearchItem' ref={SearchItemRef}>
              <img src='https://nix-tag-images.s3.amazonaws.com/586_highres.jpg' alt='IMG CANT BE FOUND' />
              <h1>Grapes:</h1>
              <input placeholder='Size in Grams' ref={SearchSizeInput} />
              <button>Add</button>
            </div>

            <div className='CustomMealButtons' ref={ref}>
              <button onClick={(e) => {
                let Size = ref.current.children[2].value

                function shortcut(num){
                return ref.current.children[num].value / Size
                }
                
                if(ref.current.children[1].value !== "" && Size && shortcut(3) && shortcut(4) && shortcut(5) && shortcut(6)){
                  custom_Meals.push({name:ref.current.children[1].value,calories:shortcut(3),protein:shortcut(4),carb:shortcut(5),fat:shortcut(6)})
                  setdaysf()
                }

                else{
                  WarnRef.current.style.display = "flex"
                  setTimeout(() => {
                    WarnRef.current.style.display = "none" 
                  },1000)
                }

              }}>Custom Add</button>
              <input placeholder='Name'/>
              <input type='number' placeholder='Size'/>
              <input type='number' placeholder='Calories'/>
              <input type='number' placeholder='Protein'/>
              <input type='number' placeholder='Carb'/>
              <input type='number' placeholder='Fat'/>
             </div>
             <div ref={WarnRef} className='Warning'>
              <h1> There is a missing value </h1>
             </div>


              {CustomMealsComponents}
              {MealsComponents}
              <div className='Total'>
                <h1>Total:- Protein: {Math.trunc(JSON.parse(localStorage.days)[props.index].totalNutrients.protein)}g - Calories: {Math.trunc(JSON.parse(localStorage.days)[props.index].totalNutrients.calories)} - Carb: {Math.trunc(JSON.parse(localStorage.days)[props.index].totalNutrients.carb)}g - Fat: {Math.trunc(JSON.parse(localStorage.days)[props.index].totalNutrients.fat)}g </h1>
              </div>
          </div>
      
        </div>
        
    </div>
    
  )
}

export default Day