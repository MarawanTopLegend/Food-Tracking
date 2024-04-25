import React, { useState,useEffect } from 'react'
import "./Container.css"
import {ContainerHeader,HabitsOverView} from "../index"
import {Day} from "../../Components/index"
import {DayInfo} from "../../Components/index"

// icons
import { MdDateRange } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { FaFireFlameCurved } from "react-icons/fa6";
import { GiChickenOven } from "react-icons/gi";
import { FaBowlRice } from "react-icons/fa6";
import { LuNut } from "react-icons/lu";
import { GiPowder } from "react-icons/gi";
import { GiProgression } from "react-icons/gi";
// date

const date = new Intl.DateTimeFormat("en-es",{
  dateStyle:"medium",
})

const day = new Intl.DateTimeFormat("en-es",{
  weekday:"short",
})

//
const Container = () => {
  let [Days,SetDays] = useState(() => JSON.parse(localStorage.days))
  let [CustomMeals,SetCustomMeals] = useState(() => JSON.parse(localStorage.customMeals))

  if(localStorage.days === undefined){
    localStorage.days = JSON.stringify([])
  }



  
  useEffect(() => {
    const handleStorageChange = () => {
      SetDays(prev => JSON.parse(localStorage.days));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); 
  
  const DaySort = [
    {id:0 ,text:"Aa Day"},
    {id:1 ,text:"Date", icon:<MdDateRange />},
    {id:2 ,text:"Exercise", icon:<CgGym />},
    {id:3 ,text:"Calories", icon:<FaFireFlameCurved />},
    {id:4 ,text:"Protein", icon:<GiChickenOven />},
    {id:5 ,text:"Carb", icon:<FaBowlRice />},
    {id:6 ,text:"Fat", icon:<LuNut />},
    {id:7 ,text:"Sugar", icon:<GiPowder />},
   ].map(Catagory =>{
     return <DayInfo key={Catagory.id} text={Catagory.text } icon={Catagory.icon} />
    })
    
  function AddNewDay(){
    let Nutrients = {
      day:day.format(new Date()),
      date:date.format(new Date()),
      targetNutrients:{protein:0, calories:0, carb:0, fat:0, includeSugar:false, exercised: false},
      totalNutrients:{protein:0, calories:0, carb:0, fat:0},
      meals:[],
      index:JSON.parse(localStorage.days).length,
    }

    function FindDay() {
      return !Days.some(Object => Object.date === date.format(new Date()));
    }
    
    if(FindDay()){
      localStorage.setItem('days', JSON.stringify([...JSON.parse(localStorage.days),Nutrients]));
      SetDays(JSON.parse(localStorage.getItem('days')));
    }
  
 
  } 
  AddNewDay()  
  
  let DaysComponents = Days.map((Nutrients,i) => {
    return <Day key={i} index={JSON.parse(localStorage.days).findIndex(e => e.date === Nutrients.date)} DaysState={{Days,SetDays}} CustomMealsState={{CustomMeals,SetCustomMeals}} />
  })

  
  return (
    <div className='Container'>
        <ContainerHeader />
        <div className='ContainerContent'>
            <HabitsOverView />
            <div className='Days'>
    
    <div className='Day'>
        <div className='DayResult'>
          {DaySort}
        </div>
    </div>
    
             {DaysComponents}
            </div>
        </div>
    </div>
  )
}

export default Container