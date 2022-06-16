import React from 'react'
import './showBars.css'
import { Card, Button } from 'react-bootstrap'

const ShowRequestBar = (props) => {



    return (
        <div className="pgm__show_request_bar_container">
            <Card body className='pgm__request_show_card'>
                <div className="pgm__request_show_card_content">
                <p>{props.name}</p>
                <div className="pgm__show_request_button">
                    <Button variant="info">Show</Button>{' '}
                    <Button variant="info">Invite</Button>{' '}
                    <Button variant="info">Accept</Button>{' '}
                    <Button variant="info">Reject</Button>
                </div>
                </div>
            </Card>
        </div>
    )
}

export default ShowRequestBar