import React from 'react'
import './showBars.css'
import {Card} from 'react-bootstrap'
import {toast} from 'react-toastify'
import axios from 'axios'
import {MdDeleteOutline} from 'react-icons/md'
import {BiShow} from 'react-icons/bi'
import { useDispatch } from 'react-redux/es/exports'
import { fetchDetails } from '../../features/admin/detailsSlice'
import { showModelOpen } from '../../features/showModel/ShowModelSlice'

const ShowBar = (props) => {

  const dispatch=useDispatch()

  const handleDelete=async(id)=>{
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
      {/* <div className="pgm__show_card_icon_container"> */}
      {props.date && <p>{props.date}</p>}
      <MdDeleteOutline className='pgm__show_card_icon' onClick={()=>handleDelete(props.id)} />
      {/* </div> */}
    </div>
  )
}

export default ShowBar