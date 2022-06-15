import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { BiShow } from 'react-icons/bi'
import { Button, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ShowBar } from '../../components'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { addEvent,selectLoading } from '../../features/admin/addEventSlice'

const AddEvent = () => {

  
  const loading=useSelector(selectLoading)
  const dispatch=useDispatch()


  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const [event, setEvent] = useState()

  const { register, handleSubmit, formState: { errors }, reset } = useForm()


  const onSubmit = (data) => {
    console.log(data)
    dispatch(addEvent({data,toast,setIsButtonClicked}))
    reset(data)
  }

  useEffect(() => {
    axios.get("http://localhost:4000/admin/event").then((res) => {
      setEvent(res.data)
      // toast.success('Loading success')
      // console.log("courses"+courses)
    }).catch((err) => {
      console.log(err.message)
      // toast.error('Database loading error')
    })
  },[isButtonClicked])

  const handleClick=()=>{
    setIsButtonClicked(!isButtonClicked)

  }

  return (
    <div className="pgm__admin_add_event_container section__margin ">
      <Button className='pgm__admin_add_event_button' onClick={handleClick}>
        {
          !isButtonClicked
            ? "Add new Event"
            : "Show Events"
        }
        {
          !isButtonClicked ?
            <GrAdd className="pgm__admin_add_event_icon" /> :
            <BiShow className="pgm__admin_add_event_icon" />
        }
      </Button>

        {
          !isButtonClicked && <div className="pgm__admin_show_event">
          <div className="pgm__admin_show_event_header">
            <p>Upcoming Events</p>
          </div>
          <div className="pgm__admin_show">
            {event && event.map((event) => <ShowBar key={event._id} url='http://localhost:4000/admin/remove-event' date={event.date} id={event._id} name={event.eventName} state={setIsButtonClicked} />)}
          </div>
        </div>
        }
      {
        isButtonClicked && <div className="pgm__admin_add_event_form_container section__padding">
        <Form method='POST' className='pgm__admin_add_event_form' onSubmit={handleSubmit(onSubmit)}>
          <label className='pgm__admin_form_label' htmlFor="course">Enter the event name :</label>
          <Form.Control className="pgm__admin-form-inputText" type='text' placeholder='Event' {...register('eventName', { required: "Course do not empty" })}></Form.Control>
          {errors.eventName && <span className='pgm__admin_form_error' role='alert'>{errors.eventName.message}</span>}
          <label className='pgm__admin_form_label' htmlFor="venue">Enter the venue :</label>
          <Form.Control className="pgm__admin-form-inputText" type='text' placeholder='venue' {...register('venue', { required: "venue do not empty"})}></Form.Control>
          {errors.venue && <span className='pgm__admin_form_error' role='alert'>{errors.venue.message}</span>}
          <label className='pgm__admin_form_label' htmlFor="date">Enter the date :</label>
          <Form.Control className="pgm__admin-form-inputText" type='date'{...register('date', { required: "date do not empty"})}></Form.Control>
          {errors.date && <span className='pgm__admin_form_error' role='alert'>{errors.date.message}</span>}
          <div>
            <Button type='submit' className="pgm__admin_add_event_form_button mx-auto" disabled={loading} variant="secondary">Add event</Button>

          </div>
        </Form>
      </div>
      }
    </div>
  )
}

export default AddEvent