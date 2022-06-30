import React,{useEffect,useState} from 'react'
import {Event} from '../../components'
import './events.css'
import axios from 'axios'

const Events = () => {

  const [events,setEvents] = useState()

  useEffect(() => {
    axios.get("http://localhost:4000/events").then((res) => {
      console.log(res.data)
      setEvents(res.data)
    }).catch((err) => {
      console.log(err.message)
    })
  },[])
  

  return (
    <div className='pgm__events section__padding' id='events'>
      <div className='pgm__events_header'>
        <p>Our Events</p>
        <h1 className='gradient__text'>Upcoming Events</h1>
        <div className="pgm__events-header-bar">
        </div>
      </div>
      <div className='pgm__events_body'>
        {events && events.map((event)=><Event key={event._id} name={event.eventName} date={event.date} venue={event.venue} />)}
        {/* <Event />
        <Event />
        <Event /> */}
      </div>
    </div>
  )
}

export default Events