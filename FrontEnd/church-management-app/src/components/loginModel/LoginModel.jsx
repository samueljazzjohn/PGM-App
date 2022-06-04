import React,{useState} from 'react'
import './loginModel.css'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { loginModelOpen, loginModelClose, selectShow } from '../../features/loginModel/loginModelSlice'

const LoginModel = () => {

    const [data,setData]=useState({username:"",password:""})
    const {username,password}=data

    const show = useSelector(selectShow)
    const dispatch = useDispatch()

    const changeHandler=(event)=>{
        console.log(event.target)
        // const [name,value]=event.target
        setData({...data,[event.target.name]:[event.target.value]})
    }

    return (

        // <div className="pgm__login-model-container">
        <Modal
            className="pgm__login-model-container fade"
            show={show}
            onHide={() => dispatch(loginModelClose())}
            tabIndex="-1"
            backdrop="static"
            keyboard={false}
        >
            {/* <Modal.Header closeButton className="pgm__login-model-header">
                    </Modal.Header> */}
            <Modal.Title className="pgm__login-model-header">Login</Modal.Title>
            <Modal.Body className="pgm__login-model-body">
                <Form className="pgm__login-model-form">
                {/* <Form.Label className='pgm__contact-form-label'>Username</Form.Label> */}
                    <Form.Control type='text' className='pgm__contact-form-inputText' placeholder="Username" name="username" value={username} onChange={changeHandler} autoComplete="off"/>
                    {/* <Form.Label className='pgm__contact-form-label'>Password</Form.Label> */}
                    <Form.Control type='password' className='pgm__contact-form-inputText' placeholder="Password" name="password" value={password} onChange={changeHandler} autoComplete="off" />
                    <div className="pgm__login_model_button_container">
                        <Button className="pgm__login-model-button" variant="secondary" onClick={() => dispatch(loginModelClose())}>
                        back
                    </Button>
                    <Button className="pgm__login-model-button" variant="primary">Login</Button>
                    </div>
                    
                </Form>
            </Modal.Body>
            {/* <Modal.Footer className="pgm__login-model-footer">
                        <Button variant="secondary" onClick={()=>dispatch(loginModelClose())}>
                            Close
                        </Button>
                        <Button variant="primary">Understood</Button>
                    </Modal.Footer> */}
        </Modal>
        // </div>
    )
}

export default LoginModel