import React from 'react'
import './showBars.css'
import { Card, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import axios from 'axios'
import { MdDeleteOutline } from 'react-icons/md'
import { BiShow } from 'react-icons/bi'
import { useDispatch } from 'react-redux/es/exports'
import { fetchDetails } from '../../features/admin/detailsSlice'
import { showModelOpen } from '../../features/showModel/ShowModelSlice'

const ShowBar = (props) => {

    const dispatch = useDispatch()


    return (
        <div className="pgm__show_answer_container">
            <div className="pgm__show_answer_card">

                <card className="pgm__show_card_body" body>{props.name}</card>
                {props.submission && <p>{props.submission}</p>}
            </div>
            <Button className="pgm__show_answer_button"><a href={props.url} target='_blank'>View</a></Button>
        </div>
    )
}

export default ShowBar