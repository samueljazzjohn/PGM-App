import React from 'react'
import './donate.css'
import { useNavigate } from 'react-router-dom'

const Donate = () => {

  const navigate=useNavigate();

  const handleDonate=()=>{
    navigate('/donate')
  }

  return (
    <div className="pgm__donate" id='donate'>
    <div className="pgm__donate-content">
      <p>'God bless you'</p>
      <h3>If you wish to donate for our ministries click this button.</h3>
    </div>
    <div className="pgm__donate-btn">
      <button type="button" onClick={handleDonate}>Donate</button>
    </div>
  </div>
  )
}

export default Donate