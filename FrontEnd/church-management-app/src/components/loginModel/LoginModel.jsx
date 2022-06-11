import React, { useState, useEffect } from 'react'
import './loginModel.css'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginModelOpen, loginModelClose, loginModelShow } from '../../features/loginModel/loginModelSlice'
import { fetchUser, login, logout, selectError } from '../../features/user/userSlice'
import { toast } from 'react-toastify'
import validator from 'validator'
import { selectLoading } from '../../features/user/userSlice'


const LoginModel = () => {

    const [data, setData] = useState({ email: "", password: "" })
    const { email, password } = data
    const [error, setError] = useState('error');
    const [iserror, setIserror] = useState(false);

    const show = useSelector(loginModelShow)
    const isLoading = useSelector(selectLoading)
    // const selectError = useSelector(selectError)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const changeHandler = (event) => {
        console.log(event.target)
        setData({ ...data, [event.target.name]: [event.target.value] })
    }

    const pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    const verifyLogin = (email, password) => {
        console.log(email)
        console.log(password)
        if (!validator.isEmail(email.toString())) {
            setError('Enter a valid email address')
        } else if (password.toString().trim().length < 8) {
            setError('password must contain atleast 8 characters')
        } else if (!pattern.test(password)) {
            setError('password must contain atleast one lowercase,uppercase and special character')
        } else {
            setError('');
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(email)
        console.log(password)
        verifyLogin(email, password)
    }

    useEffect(() => {
        isError()
    }, [error])

    useEffect(() => {
        if (!iserror && error !== 'error') {
            setError('error')
            dispatch(fetchUser({ data, navigate, toast }))
        }
    }, [iserror])

    const isError = () => {
        if (error.length === 0) {
            setIserror(false)
        } else {
            setIserror(true);
        }
    }

    return (

        <Modal
            className="pgm__login-model-container fade"
            show={show}
            onHide={() => dispatch(loginModelClose())}
            tabIndex="-1"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Title className="pgm__login-model-header">Login</Modal.Title>
            <Modal.Body className="pgm__login-model-body">
                <Form className="pgm__login-model-form" onSubmit={handleSubmit} method='POST'>
                    {
                        iserror && error !== 'error' ?
                            <div className="alert alert-danger alert-dismissible fade show p-2" role="alert">{error}</div>
                            :
                            null
                    }
                    <Form.Control type='email' className='pgm__contact-form-inputText' label="Email" placeholder="Email" name="email" value={email} onChange={changeHandler} autoComplete="off" />
                    <Form.Control type='password' className='pgm__contact-form-inputText' placeholder="Password" name="password" value={password} onChange={changeHandler} autoComplete="off" />
                    <div className="pgm__login_model_button_container">
                        <Button className="pgm__login-model-button" variant="secondary" onClick={() => dispatch(loginModelClose())}>
                            back
                        </Button>
                        <Button className="pgm__login-model-button" variant="primary" type='submit' disabled={isLoading} >Login</Button>
                    </div>

                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default LoginModel