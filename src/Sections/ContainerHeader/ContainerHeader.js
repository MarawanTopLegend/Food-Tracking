import React from 'react'
import "./ContainerHeader.css"
const ContainerHeader = () => {
  return (
    <div className='ContainerHeader'>
        <h1>Food Habits Tracker</h1>
        <input placeholder='📝 Add a note/quote' />
    </div>
  )
}

export default ContainerHeader