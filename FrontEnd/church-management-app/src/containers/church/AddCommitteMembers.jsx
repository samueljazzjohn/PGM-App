import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { BiShow } from 'react-icons/bi'
import { Button, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ShowBar } from '../../components'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import './church.css'

const AddCommitteMembers = () => {
    
//   const loading=useSelector(selectLoading)
  const dispatch=useDispatch()

  const [committee,setCommittee]=useState()


  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm()


  const onSubmit = (data) => {
    console.log(data)
    // dispatch(addCourse({data,toast,setIsButtonClicked}))
    reset(data)
  }

//   useEffect(() => {
//     axios.get("http://localhost:4000/course").then((res) => {
//       setCourse(res.data)
//       // toast.success('Loading success')
//       // console.log("courses"+courses)
//     }).catch((err) => {
//       console.log(err.message)
//       toast.error('Database loading error')
//     })
//   },[isButtonClicked])

  const handleClick=()=>{
    setIsButtonClicked(!isButtonClicked)
  }

  return (
    <div className="pgm__church_add_committee_member_container section__margin ">
      <div className="pgm__church__button_header">
    <Button className='pgm__church_add_committee_member_button' onClick={handleClick}>
      {
        !isButtonClicked
          ? "Add new Committee Member  "
          : "Show Committee Members  "
      }
      {
        !isButtonClicked ?
          <GrAdd className="pgm__church_add_committe_member_icon" /> :
          <BiShow className="pgm__church_add_committe_member_icon" />
      }
    </Button>

      {
        !isButtonClicked && <div className="pgm__church_show_committe_member">
        <div className="pgm__church_show_committe_member_header">
          <p>Committee Members</p>
        </div>
        <div className="pgm__church_show">
          {committee && committee.map((committee) => <ShowBar key={committee._id} url='http://localhost:4000/church/remove-committee' date={committee.date} id={committee._id} name={committee.committeeName} state={setIsButtonClicked} />)}
        </div>
      </div>
      }
      </div>
    {
      isButtonClicked && <div className="pgm__church_add_committee_member_form_container">
      <Form method='POST' className='pgm__church_add_committee_member_form' onSubmit={handleSubmit(onSubmit)}>
        <label className='pgm__church_form_label' htmlFor="name">Enter the name :</label>
        <Form.Control className="pgm__church-form-inputText" type='text' placeholder='Name' {...register('name', { required: "Course do not empty" })}></Form.Control>
        {errors.name && <span className='pgm__church_form_error' role='alert'>{errors.name.message}</span>}
        <label className='pgm__church_form_label' htmlFor="position">Select position :</label>
                <Form.Select aria-label="Default select" className='pgm__church-form-inputText' {...register('position', {
                  required: true,
                  validate: (position) => {
                    if (position == "--select position--") {
                      return "Select a position"
                    }
                  }
                })}>
                  <option>--select position--</option>
                  <option>president</option>
                  <option>secretary</option>
                  <option>treasurer</option>
                </Form.Select>
                {errors.position && <span className="pgm__register_error" role='alert'>{errors.position.message}</span>}
        <div>
          <Button type='submit' className="pgm__church_add_committee_member_form_button mx-auto" variant="secondary">Add event</Button>

        </div>
      </Form>
    </div>
    }
  </div>
  )
}

export default AddCommitteMembers