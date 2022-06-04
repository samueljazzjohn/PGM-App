import React from 'react'
import './about.css'
import {Feature} from '../../components'

const About = () => {
  return (
    <div className="pgm__about section__margin" id="about">
    <div className="pgm__about-feature">
      <Feature title="About PGM" text="It is a christian organisation started by Pr.Johnson with the vision of God. It registered on 14/05/2014 under society act law. It works by faith with emphasis on tribal ministry and now we have 10 works in India and also conducting a bible study centre. We also conduct crusades and conventions." />
    </div>
    <div className="pgm__about-heading" id='features'>
      <h1 className="gradient__text">Our Responsibility is beyond your imagination</h1>
      {/* <p>Explore the Library</p> */}
    </div>
    <div className="pgm__about-container">
      <Feature title="Tribal Ministry" text="We concentrate our work towards the tribals to make them more comfortable in all ways. Gives them more chances to grow " />
      <Feature title="Crusades and conventions" text="We do conventions and crusades all over India and preach the gospel." />
      <Feature title="Bible Study" text="We recently started a bible study center. All who want to learn the bible can take admission" />
    </div>
  </div>
  )
}

export default About