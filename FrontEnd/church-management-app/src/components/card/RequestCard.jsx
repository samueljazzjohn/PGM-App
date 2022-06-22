import React,{useState} from 'react'
import'./card.css'
import {Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const RequestCard = (props) => {

    const navigate=useNavigate()

    const handleClick=()=>{
        console.log('clicked')
        navigate(props.url,{state:{id:props.id}})
    }

  return (
    <div className="pgm__request_card_container">
        <Card className="pgm__request_card" body onClick={()=>handleClick()}>
            <center><img src={props.image} alt="image" /></center> 
            <p> {props.name}</p>
        </Card>
    </div>
  )
}

export default RequestCard