import { Button } from 'bootstrap'
import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div className="pgm__footer section__padding">
    <div className="pgm__footer-heading">
      <h1 className="gradient__text">Do you want to step in to the future before others</h1>
    </div>

    {/* <div className="pgm__footer-btn">
      <p>Request Early Access</p>
    </div> */}

    <div className="pgm__footer-links">
      <div className="pgm__footer-links_logo">
        <span className='pgm__logo'>PGM</span>
        <a href='#home' className="pgm__footer-btn"> <p>Top</p> </a>
      </div>
      <div className="pgm__footer-links_div">
        <h4>Links</h4>
        <p>Facebook</p>
        <p>Instagram</p>
        <p>Contact</p>
      </div>
      <div className="pgm__footer-links_div">
        <h4>Get in touch</h4>
        <p>Vadakara Pin-673104</p>
        <p>+91-8281051312</p>
        <p>pgmvindia1@gmail.com</p>
      </div>
    </div>

    <div className="pgm__footer-copyright">
      <p>@2022 pgm. All rights reserved.</p>
    </div>
  </div>
  )
}

export default Footer