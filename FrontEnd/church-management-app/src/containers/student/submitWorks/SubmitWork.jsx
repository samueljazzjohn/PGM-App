import React, { useState } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../features/user/userSlice'
import { toast } from 'react-toastify'
import { storage } from '../../../firebase'
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


const SubmitWork = () => {

    const { state } = useLocation()
    const [loading, setLoading] = useState(false)
    const [uploading,setUploading] = useState(false)
    const [progress, setProgress] = useState()
    const [url, setUrl] = useState()

    const user = useSelector(selectUser)

    const token = user.token

    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    const onSubmit = async (data) => {
        setLoading(true)
        if(!url) return;
        console.log("post"+url)
        // data.upload=url
        // data.id=state
        data={upload:url,id:state.id}
        axios.post("http://localhost:4000/student/upload-work", data, { headers: { "authorization": `Bearer ${token}`, "Contetnt-Type": "multipart/form-data" } }).then((res) => {
            setLoading(false)
            toast.success('Answer submitted')
            console.log(res.data)
        }).catch((err) => {
            setLoading(false)
            console.log(err.message)
            toast.error('Something went wrong')
        })
    }

    const handleUpload=(data)=>{
        console.log(data)
        setUploading(true)
        console.log(data[0])
        let file = data[0]
        data.fileName=data[0].name
        uploadFile(file)
    }

    const uploadFile = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                console.log(error)
                setUploading(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL)
                    console.log(downloadURL)
                    setUploading(false)
                });
            });
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
                <Row>
                    <Col>
                    {progress ? <p>{progress}%</p>:null}
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
                        <Button className="pgm__teacher_assign_works-button" disabled={uploading} variant="primary" onClick={()=>handleUpload(watch("upload"))}>Upload</Button>
                    </Col>
                    <Col>
                        <Button className="pgm__teacher_assign_works-button" disabled={loading} variant="primary" type="submit" >Submit</Button>
                    </Col>
                </Row>

            </Form>
        </div>
    )
}

export default SubmitWork