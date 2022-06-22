import React from 'react'
import './showBars.css'
import {toast} from 'react-toastify'
import axios from 'axios'
import {MdDeleteOutline} from 'react-icons/md'


const CommitteeMemberShow = (props) => {

    const handleClick=()=>{
        var payload={position:props.position,name:props.data}
        console.log(props.token)

        axios.delete(props.url,{headers:{"authorization" : `Bearer ${props.token}`},data:{payload:payload}}).then(()=>{
            toast.success("Deleted Successfully")
            props.state()
        }).catch((err)=>{
            toast.error("Server error")
        })
    }

  return (
    <div className="pgm__show_card_container">
      <card className="pgm__show_card_body" body>{props.data}</card>
      <MdDeleteOutline className='pgm__show_card_icon' onClick={()=>handleClick()} />
    </div>
  )
}

export default CommitteeMemberShow