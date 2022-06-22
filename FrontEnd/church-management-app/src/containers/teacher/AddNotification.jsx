import React,{useState} from 'react'
import './teacher.css'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'

const AddNotification = () => {

    const [loading,setLoading] =useState(false)

    const { register, handleSubmit, formState: { errors },reset } = useForm()

    const user=useSelector(selectUser)

    const token=user.token

    var date = new Date()

    const onSubmit = (data) => {
        setLoading(true)
        data={...data,date:date}
        axios.post("http://localhost:4000/teacher/add-notification",data,{headers:{"authorization" : `Bearer ${token}`}}).then(()=>{
            setLoading(false)
            toast.success("Notifications added")
            // data.reset({title:"",message:""})
        }).catch((err)=>{
            setLoading(false)
            toast.error("Server error")
        })
    }


    return (
        <div className="pgm__teacher_add_notification_container section__margin">
            <div className="pgm__teacher_heading">
                <h5>Add notification</h5>
            </div>
            <Form className="pgm__teacher_add_notification-form" method='POST' onSubmit={handleSubmit(onSubmit)}>
                <label className='pgm__teacher_form_label' htmlFor="name">Enter the title :</label>
                <Form.Control type='text' className='pgm__teacher-form-inputText' placeholder='Titile' {...register("title", { required: "title required" })} />
                {errors.title && <span className="pgm__register_error" role='alert'>{errors.title.message}</span>}
                <label className='pgm__teacher_form_label' htmlFor="name">Enter the Message :</label>
                <Form.Control as='textarea' className='pgm__teacher-form-inputText' placeholder='message' style={{ height: '100px' }} {...register('message', { required: "message required", minLength: { value: 5, message: "Username must contain 5 charecters" } })} />
                {errors.message && <span className="pgm__register_error" role='alert'>{errors.message.message}</span>}

                <Button className="pgm__teacher_add_notification-button" disabled={loading} variant="primary" type="submit" >Add</Button>

            </Form>
        </div>
    )
}

export default AddNotification