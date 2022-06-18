import React,{useState} from 'react'
import './showBars.css'
import { Card, Button } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux/es/exports'
import { showModelShow,showModelOpen } from '../../features/showModel/ShowModelSlice'
import { fetchChurch,churchData } from '../../features/admin/churchDetails'
import { fetchStudent,studentData } from '../../features/admin/studentDetails'
import { fetchTeacher,teacherData } from '../../features/admin/teacherDetails'
import { selectUser } from '../../features/user/userSlice'
import {toast} from 'react-toastify'
import axios from 'axios'

const ShowRequestBar = (props) => {

    const showModel=useSelector(showModelShow)

    const churchDetails=useSelector(churchData)
    const studentDetails=useSelector(studentData)
    const teacherDetails=useSelector(teacherData)
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
        if(props.type=='church'){
            dispatch(fetchChurch({data})).then(()=>{
                dispatch(showModelOpen())
            }).catch((err)=>{
                toast.error('Server error')
            })
        }
        else if(props.type=='student'){
            dispatch(fetchStudent({data})).then(()=>{
                dispatch(showModelOpen())
            }).catch((err)=>{
                toast.error('Server error')
            })
        }
        else if(props.type=='teacher'){
            dispatch(fetchTeacher({data})).then(()=>{
                dispatch(showModelOpen())
            }).catch((err)=>{
                toast.error('Server error')
            })
        }
    }

    const handleAccept=()=>{

    }

    const handleReject=()=>{

    }


    return (
        <div className="pgm__show_request_bar_container">
            <Card body className='pgm__request_show_card'>
                <div className="pgm__request_show_card_content">
                <p>{props.name}</p>
                <div className="pgm__show_request_button">
                    <Button variant="info" onClick={handleModel}>Show</Button>{' '}
                    {/* {studentDetails && <Button variant="info" onClick={handleInvite} disabled={studentDetails.mailSend}>Invite</Button>}
                    {churchDetails && <Button variant="info" onClick={handleInvite} disabled={churchDetails.mailSend}>Invite</Button>}
                    {teacherDetails && <Button variant="info" onClick={handleInvite} disabled={teacherDetails.mailSend}>Invite</Button>} */}
                    <Button variant="info">Accept</Button>{' '}
                    <Button variant="info">Reject</Button>
                </div>
                </div>
            </Card>
        </div>
    )
}

export default ShowRequestBar