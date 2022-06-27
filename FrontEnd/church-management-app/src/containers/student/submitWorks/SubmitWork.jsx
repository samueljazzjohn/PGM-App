import React, { useState } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../features/user/userSlice'
import {toast} from 'react-toastify'
import {storage} from '../../../firebase'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


const SubmitWork = () => {

    const { state } = useLocation()
    const [loading, setLoading] = useState(false)

    const user = useSelector(selectUser)

    const token = user.token

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = (data) => {
        setLoading(true)
        console.log(data.upload[0].name)
        data=data.upload[0]
        // data.fileName=data.upload[0].name
        axios.post("http://localhost:4000/student/upload-work",data, { headers: { "authorization": `Bearer ${token}`, "Contetnt-Type":"multipart/form-data"  } }).then((res) => {
            setLoading(false)
            toast.success('Answer submitted')
            console.log(res.data)
        }).catch((err) => {
            setLoading(false)
            console.log(err.message)
            toast.error('Something went wrong')
        })
    }

    return (
        <div className="pgm__submit_work_container section__margin">
            <Form className="pgm__student_submit_works-form" method='POST' onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <label className='pgm__church_form_label' htmlFor="name">Choose a file :</label>
                        <Form.Control className='pgm__teacher-form-inputText' type="file" accept="application/pdf" {...register('upload', { required: "Please upload a file" })} />
                        {errors.upload && <span className="pgm__register_error" role='alert'>{errors.upload.message}</span>}

                    </Col>
                </Row>
                {/* <Row>
          <Col>
          <label className='pgm__church_form_label' htmlFor="name">Choose a file :</label>
          <Button className="pgm__teacher_assign_works-upload-button" onClick={uploadWidget}>Upload</Button>
          </Col>
        </Row> */}
                <Row>
                    <Col>
                        <Button className="pgm__teacher_assign_works-button" disabled={loading} variant="primary" type="submit" >Submit</Button>
                    </Col>
                </Row>

            </Form>
        </div>
    )
}

export default SubmitWork