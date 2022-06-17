import React,{useState} from 'react'
import './showBars.css'
import { Card, Button } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux/es/exports'
import { showModelShow,showModelOpen } from '../../features/showModel/ShowModelSlice'
import { fetchChurch } from '../../features/admin/churchDetails'
import {toast} from 'react-toastify'
import axios from 'axios'

const ShowRequestBar = (props) => {

    const showModel=useSelector(showModelShow)

    const dispatch=useDispatch()

    const [details,setDetails]=useState()

   const  handleModel=()=>{
        var data={
            id:props.id,
            type:props.type
        }
        console.log(data)
        // data=JSON.stringify(data)

        // var data=new FormData()
        // data.append('id',props._id);
        // data.append('type',props.type)
        dispatch(fetchChurch({data})).then(()=>{
            dispatch(showModelOpen())
        }).catch((err)=>{
            toast.error('Server error')
        })
    }


    return (
        <div className="pgm__show_request_bar_container">
            <Card body className='pgm__request_show_card'>
                <div className="pgm__request_show_card_content">
                <p>{props.name}</p>
                <div className="pgm__show_request_button">
                    <Button variant="info" onClick={handleModel}>Show</Button>{' '}
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