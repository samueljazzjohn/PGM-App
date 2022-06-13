import React from 'react'
import './dashboardTab.css'
import {Form} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import {FiSearch} from 'react-icons/fi'



const DashboardHometab = () => {

  const {register,handleSubmit} = useForm()

  const handleSearch=(data)=>{
    console.log(data)
  }

  const handleAccount=()=>{
    console.log("image pressed")
  }

  return (
    <div className="pgm__dashboard_hometab">
        <div className="pgm__dashboard_search">
          <Form.Control type='text' className='pgm__sarch_box' placeholder='Search here' {...register('search')} />
          <FiSearch onClick={handleSubmit(handleSearch)} className="pgm__dashboard_search_icon" size='30px' />
        </div>
        <div className="pgm__dashboard_user">
          <p>SamuelJazzJohn</p>
          <img onClick={handleAccount} src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />
        </div>
    </div>    
)
}

export default DashboardHometab