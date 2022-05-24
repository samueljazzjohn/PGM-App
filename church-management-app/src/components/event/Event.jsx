import React from 'react'
import './Event.css'
import {Card} from "react-bootstrap"
import image from "../../assets/flying_dove.png"

const Event = () => {
    return (
        <Card style={{ width: '18rem' }} bg='dark' className='pgm__event-container'>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Text className='pgm__event-card-text'>
                  <div className='pgm__event-card-text-date'>
                      20 sep 2020
                  </div>
                  <div className='pgm__event-card-text-place'>
                      kallor
                  </div>
                </Card.Text>
                <Card.Title className='pgm__event-card-title'>Card Title</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default Event