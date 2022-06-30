import React from 'react'
import './Event.css'
import {Card} from "react-bootstrap"
import image from "../../assets/event-icon.png"
import {BsCalendar2Event,BsCalendarDate} from "react-icons/bs";
import {MdPlace} from "react-icons/md"


const Event = (props) => {
    return (
        <Card style={{ width: '18rem' }} bg='dark' className='pgm__event-container'>
            <Card.Img variant="top" src={image} className='pgm__event-image'/>
            <Card.Body className='pgm__event-body'>
                <div className="pgm__event-card-bar"></div>
                <Card.Text className='pgm__event-card-text'>
                  <div className='pgm__event-card-text-date'>
                  <BsCalendarDate className='pgm__even-date-icon'/> <p>{props.date}</p>
                  </div>
                  <div className='pgm__event-card-text-place'>
                     <MdPlace className='pgm__even-place-icon'/> <p>{props.venue}</p> 
                  </div>
                </Card.Text>
                <Card.Title className='pgm__event-card-title'>{props.name}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default Event