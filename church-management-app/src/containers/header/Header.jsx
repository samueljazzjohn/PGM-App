import React from 'react'
import './header.css'
import dove from '../../assets/dove.png'

const Header = () => {
  return (
    <div className='pgm__header section__padding' id='home'>
      <div className="pgm__header-content">
        <h1 className="gradient__text">
          PENIEL GOSPEL MINISTRY
        </h1>
        <p>We have just started admission to our study centre if you are interested in bible studies please grab your seat</p>
        <div className="pgm__header-content__input">
          <input type="email" placeholder="Your Email Address" />
          <button type="button">Join</button>
        </div>

        {/* <div className="pgm__header-content__people">
        <img src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div> */}
      </div>
      <div className="pgm__header-image">
        <img src={dove} alt="" />
      </div>
    </div>
  )
}

export default Header