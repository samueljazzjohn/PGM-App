import React from 'react'
import {Event} from '../../components'
import './events.css'

const Events = () => {
  return (
    <div className='pgm__events section__padding'>
      <div className='pgm__events_header'>
        <p>Our Events</p>
        <h1 className='gradient__text'>Upcoming Events</h1>
        <div className="pgm__events-header-bar">
        </div>
      </div>
      <div className='pgm__events_body'>
        <Event />
        <Event />
        <Event />
      </div>
    </div>
  )
}

export default Events