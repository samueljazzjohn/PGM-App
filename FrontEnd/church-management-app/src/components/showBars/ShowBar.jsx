import React from 'react'
import './showBars.css'
import {Card} from 'react-bootstrap'
import {toast} from 'react-toastify'
import axios from 'axios'
import {MdDeleteOutline} from 'react-icons/md'

const ShowBar = (props) => {

  const handleClick=async(id)=>{
    console.log(id)
    var payload={
      "id":id
    }
    await axios.delete(props.url,{params:payload}).then((res)=>{
      console.log(res.data)
      toast.success('Deleted successfully')
      props.state()
    }).catch((err)=>{
      toast.error('Server error')
      console.log(err)
    })
  }

  return (
    <div className="pgm__show_card_container">
      <card className="pgm__show_card_body" body>{props.name}</card>
      {props.date && <p>{props.date}</p>}
      <MdDeleteOutline className='pgm__show_card_icon' onClick={()=>handleClick(props.id)} />
    </div>
  )
}

export default ShowBar