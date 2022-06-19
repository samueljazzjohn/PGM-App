import React,{useState} from 'react'
import './showBars.css'
import { Card, Button } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux/es/exports'
import { showModelShow,showModelOpen } from '../../features/showModel/ShowModelSlice'
import { useNavigate } from 'react-router-dom'
import { fetchDetails } from '../../features/admin/detailsSlice'
import { selectUser } from '../../features/user/userSlice'
import {toast} from 'react-toastify'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const ShowRequestBar = (props) => {

    const showModel=useSelector(showModelShow)

    const navigate=useNavigate()
   
    const userDetails=useSelector(selectUser)

    const dispatch=useDispatch()

    const [details,setDetails]=useState()

   const  handleModel=()=>{
        var data={
            id:props.id,
            type:props.type,
            email:props.email,
        }

        console.log(data)

        dispatch(fetchDetails({data})).then(()=>{
            dispatch(showModelOpen())
        }).catch((err)=>{
            toast.error("Server error")
        })
    }

    const handleAccept=()=>{
        var data={id:props.id}

        axios.patch("http://localhost:4000/admin/accept-request",data).then(()=>{
            toast.success("Request accepted successfully")
            navigate('/admin/manage-request')

        }).catch((err)=>{
            toast.error("Server error")
        })
    }

    const handleReject=()=>{
        var data={id:props.id,type:props.type}
        axios.delete("http://localhost:4000/admin/reject-request",{params:data}).then(()=>{
            toast.success("Request rejected successfully")
            navigate('/admin/manage-request')

        }).catch((err)=>{
            toast.error("Server error")
        })

    }


    return (
        <div className="pgm__show_request_bar_container">
            <Card body className='pgm__request_show_card'>
                <div className="pgm__request_show_card_content">
                <p>{props.name}</p>
                <div className="pgm__show_request_button">
                    <Button variant="info" onClick={handleModel}>Show</Button>{' '}
                    <Button variant="info" onClick={handleAccept}>Accept</Button>{' '}
                    <Button variant="info" onClick={handleReject}>Reject</Button>
                </div>
                </div>
            </Card>
        </div>
    )
}

export default ShowRequestBar