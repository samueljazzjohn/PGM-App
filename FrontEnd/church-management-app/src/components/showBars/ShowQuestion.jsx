import React from 'react'
import './showBars.css'
import { Card } from 'react-bootstrap'
import { toast } from 'react-toastify'
import axios from 'axios'
import { MdDeleteOutline } from 'react-icons/md'
import { BiShow } from 'react-icons/bi'
import { useDispatch } from 'react-redux/es/exports'
import { fetchDetails } from '../../features/admin/detailsSlice'
import { showModelOpen } from '../../features/showModel/ShowModelSlice'
import {useNavigate} from 'react-router-dom'

const ShowQuestion = (props) => {

    const dispatch = useDispatch()

    const navigate=useNavigate()

    const handleDelete = async (id) => {
        console.log(id)
        var payload = {
            "id": id
        }
        await axios.delete(props.url, {headers:{"authorization" : `Bearer ${props.token}`},data:{payload}}).then((res) => {
            console.log(res.data)
            toast.success('Deleted successfully')
            props.state()
        }).catch((err) => {
            toast.error('Server error')
            console.log(err)
        })
    }

    const handleClick=()=>{
        navigate('/student/view-works/submit-work',{state:{id:props.nav}})
    }


    return (
        <div>
            {
            props.nav && 
            <div className="pgm__question_show_card_container" onClick={handleClick}>
            <div className="pgm__question_show_card_header">
                <card className="pgm__show_card_body" body>{props.name}  {props.course && props.course}</card>
                {props.date && <p>{props.date}</p>}
                {props.url && <MdDeleteOutline className='pgm__show_card_icon' onClick={() => handleDelete(props.id)} />}
            </div>
            <hr></hr>
            <div className="pgm__question_show_card_body">
                {props.question}
            </div>
        </div>
            }
            {
            !props.nav && 
            <div className="pgm__question_show_card_container">
            <div className="pgm__question_show_card_header">
                <card className="pgm__show_card_body" body>{props.name}  {props.course && props.course}</card>
                {props.date && <p>{props.date}</p>}
                {props.url && <MdDeleteOutline className='pgm__show_card_icon' onClick={() => handleDelete(props.id)} />}
            </div>
            <hr></hr>
            <div className="pgm__question_show_card_body">
                {props.question}
            </div>
        </div>
            }
        </div>
        
    )
}

export default ShowQuestion