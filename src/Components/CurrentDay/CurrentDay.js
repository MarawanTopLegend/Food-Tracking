import React from 'react'
import { LuTable } from "react-icons/lu";
import "./CurrentDay.css"
const CurrentDay = (props) => {
  return (
    <button className='CurrentDay'> <div className='Icon'><LuTable /></div> <h3> {props.text} </h3></button>
  )
}

export default CurrentDay