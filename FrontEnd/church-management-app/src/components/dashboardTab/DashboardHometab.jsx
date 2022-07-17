import React, { useEffect } from 'react'
import './dashboardTab.css'
import { Form,Button } from 'react-bootstrap'
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
    dispatch(logout())
    navigate('/')
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
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />
          <Button className="pgm__logout_button" variant='danger' onClick={handleLogOut} >Logout</Button>
      </div>
    </div>
  )
}

export default DashboardHometab