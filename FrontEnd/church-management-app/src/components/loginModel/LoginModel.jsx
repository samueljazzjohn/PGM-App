import React,{useState} from 'react'
import './loginModel.css'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { loginModelOpen, loginModelClose, loginModelShow } from '../../features/loginModel/loginModelSlice'


const LoginModel = () => {

    const [data,setData]=useState({username:"",password:""})
    const {username,password}=data
    const [error,setError]=useState();
    const [iserror,setIserror]=useState(false);

    const show = useSelector(loginModelShow)
    const dispatch = useDispatch()


    const changeHandler=(event)=>{
        console.log(event.target)
        setData({...data,[event.target.name]:[event.target.value]})
    }

    const pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
      );

    const verifyLogin = (username,password)=>{
        console.log(username)
        console.log(password)
        if(username.toString().trim().length<5){
            // console.log("username must contain atleast 5 letters")
            setError('username must contain atleast 5 letters')
        }else if(password.toString().trim().length<8){
            // console.log('password must contain atleast 8 characters')
            setError('password must contain atleast 8 characters')
        }else if(!pattern.test(password)){
            setError('password must contain atleast one lowercase,uppercase and special character')
        }else{
            setError('');
            console.log(error)
        }
    }

    const handleSubmit =  (event)=> {
        event.preventDefault()
        console.log(username)
        console.log(password)
        verifyLogin(username,password)
        isError()
    }

    const isError=()=>{
        if(error.length===0){
            setIserror(false)
        }else{
            setIserror(true);
        }
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
                <Form className="pgm__login-model-form" onSubmit={handleSubmit} method='POST'>
                {/* <Form.Label className='pgm__contact-form-label'>Username</Form.Label> */}
                     {
                         iserror ?
                             <div className="alert alert-danger alert-dismissible fade show p-2" role="alert">{error}</div> 
                         :
                              null
                     }
                    <Form.Control type='text' className='pgm__contact-form-inputText' placeholder="Email" name="username" value={username} onChange={changeHandler} autoComplete="off"/>
                    {/* <Form.Label className='pgm__contact-form-label'>Password</Form.Label> */}
                    <Form.Control type='password' className='pgm__contact-form-inputText' placeholder="Password" name="password" value={password} onChange={changeHandler} autoComplete="off" />
                    <div className="pgm__login_model_button_container">
                        <Button className="pgm__login-model-button" variant="secondary" onClick={() => dispatch(loginModelClose())}>
                        back
                        </Button>
                        <Button className="pgm__login-model-button" variant="primary" type='submit' >Login</Button>
                    </div>
                    
                </Form>
            </Modal.Body>
        </Modal>
        // </div>
    )
}

export default LoginModel