import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { BiShow } from 'react-icons/bi'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ShowBar } from '../../components'
import axios from 'axios'
import { addMember,selectLoading } from '../../features/church/addMemberSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import './church.css'

const AddMembers = () => {


  const loading=useSelector(selectLoading)
  const user=useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate=useNavigate()

  const [members, setMembers] = useState()

  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()

  const token=user.token

  const onSubmit = (data) => {
    console.log(data)
    dispatch(addMember({data,token,toast,setIsButtonClicked}))
    reset(data)
  }

    useEffect(() => {
      axios.get("http://localhost:4000/church/member-details",{headers:{"authorization" : `Bearer ${token}`}}).then((res) => {
        setMembers(res.data)
        // toast.success('Loading success')
        // console.log("courses"+courses)
      }).catch((err) => {
        console.log(err.message)
      })
    },[isButtonClicked])

  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked)
  }

  return (
    <div className="pgm__church_add_member_container section__margin ">
      {!user && navigate('/')}
      <div className="pgm__church__button_header">
      <Button className='pgm__church_add_member_button' onClick={handleClick}>
        {
          !isButtonClicked
            ? "Add new member"
            : "Show members"
        }
        {
          !isButtonClicked ?
            <GrAdd className="pgm__church_add_member_icon" /> :
            <BiShow className="pgm__church_add_member_icon" />
        }
      </Button>

      {
        !isButtonClicked && <div className="pgm__church_show_member">
          <div className="pgm__church_show_member_header">
            <p>Members</p>
          </div>
          <div className="pgm__church_show">
            {members && members.map((member) => <ShowBar key={member._id} url='http://localhost:4000/church/remove-member' date={member.date} id={member._id} name={member.memberName} state={setIsButtonClicked} />)}
          </div>
        </div>
      }
      </div>
      {
        isButtonClicked && <div className="pgm__church_add_member_form_container">
          <Form method='POST' className='pgm__church_add_member_form' onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <label className='pgm__church_form_label' htmlFor="course">Enter the member name :</label>
                <Form.Control className="pgm__church-form-inputText" type='text' placeholder='member' {...register('memberName', { required: "Course do not empty" })}></Form.Control>
                {errors.memberName && <span className='pgm__church_form_error' role='alert'>{errors.memberName.message}</span>}
              </Col>
              <Col>
                <label className='pgm__church_form_label' htmlFor="phone">Enter the phone number :</label>
                <Form.Control className="pgm__church-form-inputText" type='text' placeholder='phone' {...register('phone', {
              required: true, minLength: { value: 10, message: "Your phone number must be atleast 10 numbers" },
              //  valueAsNumber: "Please enter a valid phone number",
              maxLength: { value: 10, message: "Enter a valid phone" }
            })}></Form.Control>
                {errors.phone && <span className='pgm__church_form_error' role='alert'>{errors.phone.message}</span>}
              </Col>
            </Row>
            <Row>
              <Col className='sm-10 col-md-6'>
                <label className='pgm__church_form_label' htmlFor="venue">Marital Status :</label>
                <Form.Select aria-label="Default select" className='pgm__church-form-inputText' {...register('maritalStatus', {
                  required: true,
                  validate: (maritalStatus) => {
                    if (maritalStatus == "--select status--") {
                      return "Select a status"
                    }
                  }
                })}>
                  <option>--select status--</option>
                  <option>Single</option>
                  <option>Married</option>
                </Form.Select>
                {errors.maritalStatus && <span className="pgm__register_error" role='alert'>{errors.maritalStatus.message}</span>}
              </Col>
              <Col className='sm-10 col-md-6'>
                <label className='pgm__church_form_label' htmlFor="isBaptized">Are you baptized :</label>
                <Form.Select aria-label="Default select" className='pgm__church-form-inputText' {...register('isBaptized', {
                  required: true,
                  validate: (isBaptized) => {
                    if (isBaptized == "--select option--") {
                      return "Select an option"
                    }
                  }
                })}>
                  <option>--select option--</option>
                  <option>Yes</option>
                  <option>No</option>
                </Form.Select>
                {errors.isBaptized && <span className="pgm__register_error" role='alert'>{errors.isBaptized.message}</span>}

              </Col>
            </Row>
            <Row>
              {watch("isBaptized") == "Yes" &&
                <Col>
                  <label className='pgm__church_form_label' htmlFor="date">Enter the baptized date :</label>
                  <Form.Control className="pgm__church-form-inputText" type='date'{...register('baptizedDate', { required: "date do not empty" })}></Form.Control>
                  {errors.baptizedDate && <span className='pgm__church_form_error' role='alert'>{errors.baptizedDate.message}</span>}
                </Col>
              }
            </Row>
            <div>
              <Button type='submit' className="pgm__church_add_member_form_button mx-auto" disabled={loading} variant="secondary">Add member</Button>

            </div>
          </Form>
        </div>
      }
    </div>
  )
}

export default AddMembers