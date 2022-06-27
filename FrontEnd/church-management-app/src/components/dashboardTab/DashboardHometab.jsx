import React, { useEffect } from 'react'
import './dashboardTab.css'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { FiSearch } from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../features/user/userSlice'


const DashboardHometab = () => {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  // useEffect(() => {
  //   console.log(user)
  //   if (user==null) {
  //     navigate('/')
  //   }
  // })


  const { register, handleSubmit } = useForm()

  const handleSearch = (data) => {
    console.log(data)
  }

  const handleAccount = () => {
    console.log("image pressed")
  }

  const handleLogOut = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className="pgm__dashboard_hometab">
      <div className="pgm__dashboard_search">
        <Form.Control type='text' className='pgm__sarch_box' placeholder='Search here' {...register('search')} />
        <FiSearch onClick={handleSubmit(handleSearch)} className="pgm__dashboard_search_icon" size='30px' />
      </div>
      <div className="pgm__dashboard_user">
        <p>{user!=null && user.username}</p>
        <div className="dropdown">
          <button className="toggle-btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <p className="dropdown-item" onClick={handleLogOut}>Logout</p>
            {/* <a></a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHometab