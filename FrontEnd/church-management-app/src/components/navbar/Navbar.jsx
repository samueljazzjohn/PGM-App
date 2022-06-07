import React from 'react'
import LoginModel from '../loginModel/LoginModel'
import './navbar.css'
import { Navbar,Container,Nav,Button } from "react-bootstrap"
import {useSelector,useDispatch} from 'react-redux'
import { loginModelOpen,selectShow } from '../../features/loginModel/loginModelSlice'

const NavBar = () => {

  // const show=useSelector(selectShow)
  const dispatch=useDispatch()

  const handleClick=()=>{
    dispatch(loginModelOpen())
  }

  return (
    <div className="pgm__navbar gradient__bg">
      <LoginModel />
      <Navbar className="pgm__navbar-container" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="pgm__navbar-logo">PGM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='pgm__navbar-toggle navbar-dark '/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" className="pgm__navbar-link px-3">Home</Nav.Link>
              <Nav.Link href="#about" className="pgm__navbar-link px-3">About</Nav.Link>
              <Nav.Link href="#features" className="pgm__navbar-link px-3">Features</Nav.Link>
              <Nav.Link href="#events" className="pgm__navbar-link px-3">Events</Nav.Link>
              <Nav.Link href="#donate" className="pgm__navbar-link px-3">Donate</Nav.Link>
              <Nav.Link href="#contact" className="pgm__navbar-link px-3">Contact</Nav.Link>
            </Nav>
            <div className="pgm__navbar-sign-container">
            <p><a onClick={handleClick} >Sign in</a></p>
            <Button className="button" type='button' onClick={handleClick}>Register</Button>
          </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavBar