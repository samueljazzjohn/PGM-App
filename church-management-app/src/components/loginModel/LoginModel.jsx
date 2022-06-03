import React from 'react'
import './loginModel.css'
import { Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { loginModelOpen,loginModelClose,selectShow } from '../../features/loginModel/loginModelSlice'

const LoginModel = () => {

    const show = useSelector(selectShow)
    const dispatch = useDispatch()

    return (

        // <div className="pgm__login-model-container">
                <Modal
                    show={show}
                    onHide={()=>dispatch(loginModelClose())}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        I will not close if you click outside me. Don't even try to press
                        escape key.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>dispatch(loginModelClose())}>
                            Close
                        </Button>
                        <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                </Modal> 
        // </div>
    )
}

export default LoginModel