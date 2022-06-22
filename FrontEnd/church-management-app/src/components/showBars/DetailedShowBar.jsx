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
import { useNavigate } from 'react-router-dom'


const DetailedShowBar = (props) => {

  const navigate=useNavigate()

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

    const handleShow=()=>{
        var data={
          id:props.id,
          type:props.type,
          email:props.email,
      }
    
      console.log(data)
    
      dispatch(fetchDetails({data})).then(()=>{
          dispatch(showModelOpen(false))
      }).catch((err)=>{
          toast.error("Server error")
      })
      }

      const handleClick=()=>{
        console.log(props)
        navigate('/admin/church-details/church-data',{state:{id:props.id}})
      }

    return (
        <div className="pgm__show_card_container" onClick={handleClick}>
          <card className="pgm__show_card_body" body>{props.name}</card>
          <div className="pgm__show_card_icon">
          {props.details && <BiShow className='pgm__show_card_icon_show' onClick={handleShow}></BiShow>}
          {props.details && <MdDeleteOutline className='pgm__show_card_icon' onClick={()=>handleDelete(props.id)} />}
          </div>
        </div>
      )
}

export default DetailedShowBar