import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { BiShow } from 'react-icons/bi'
import { Button, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ShowBar } from '../../components'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import CommitteeMemberShow from '../../components/showBars/CommitteeMemberShow'
import './church.css'
import { addMemberSlice } from '../../features/church/addMemberSlice'

const AddCommitteMembers = () => {

  const dispatch = useDispatch()
  const user=useSelector(selectUser)

  const [loading,setLoading] = useState(false)
  const [committee, setCommittee] = useState()
  const [members,setMembers] = useState()


  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const token=user.token


  const onSubmit = (data) => {
    setLoading(true)
    console.log(data)
    axios.patch("http://localhost:4000/church/add-committee-member",data,{headers:{"authorization" : `Bearer ${token}`}}).then(()=>{
      toast.success('successfully added')
      setLoading(false)
      setIsButtonClicked(false)
    }).catch((err)=>{
      setLoading(false)
      console.log(err)
    })
    reset(data)
  }

// Get members
  useEffect(() => {
    axios.get("http://localhost:4000/church/member-details",{headers:{"authorization" : `Bearer ${token}`}}).then((res) => {
      setMembers(res.data)
      // toast.success('Loading success')
      // console.log("courses"+courses)
    }).catch((err) => {
      console.log(err.message)
    })
  },[isButtonClicked])


// Get committe members
    useEffect(() => {
      axios.get("http://localhost:4000/church/get-committee-members",{headers:{"authorization" : `Bearer ${token}`}}).then((res) => {
        console.log(res.data.otherMembers)
        setCommittee(res.data)
        // toast.success('Loading success')
        // console.log("courses"+courses)
      }).catch((err) => {
        console.log(err.message)
        toast.error('Database loading error')
      })
    },[isButtonClicked])

  const handleClick = () => {
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
              {
                committee && committee.president &&
              <div className="pgm__church_committee_president">
                <h5>President</h5>
              <CommitteeMemberShow token={token} url='http://localhost:4000/church/remove-committee-member' position="president" data={committee.president} state={setIsButtonClicked} />
              </div>
              }
              {
                committee && committee.secretary && 
              <div className="pgm__church_committee_president">
                <h5>Secretary</h5>
              <CommitteeMemberShow token={token} url='http://localhost:4000/church/remove-committee-member' position="secretary" data={committee.secretary} state={setIsButtonClicked} />
              </div>
              }
              {
                committee && committee.treasurer && 
              <div className="pgm__church_committee_president">
                <h5>Treasurer</h5>
              <CommitteeMemberShow token={token} url='http://localhost:4000/church/remove-committee-member' position="treasurer" data={committee.treasurer} state={setIsButtonClicked} />
              </div>
              }
              {
                committee && committee.otherMembers.length>0 && 
              <div className="pgm__church_committee_president">
                <h5>Other Members</h5>
                {committee.otherMembers.map((member)=><CommitteeMemberShow token={token} url='http://localhost:4000/church/remove-committee-member' position="otherMembers" data={member} state={setIsButtonClicked} />)}
              </div>
              }
            </div>
          </div>
        }
      </div>
      {
        isButtonClicked && <div className="pgm__church_add_committee_member_form_container">
          <Form method='POST' className='pgm__church_add_committee_member_form' onSubmit={handleSubmit(onSubmit)}>
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
              <option>otherMembers</option>
            </Form.Select>
            {errors.position && <span className="pgm__register_error" role='alert'>{errors.position.message}</span>}
            <label className='pgm__church_form_label' htmlFor="name">Enter the name :</label>
              <Form.Select aria-label="Default select" className='pgm__church-form-inputText' {...register('memberName', {
                required: true,
                validate: (member) => {
                  if (member == "--select member--") {
                    return "Select a member"
                  }
                }
              })}>
                <option>--select member--</option>
                {members && console.log(members)}
                { members && members.map((member)=><option key={member._id}>{member.memberName}</option>)}
              </Form.Select>
            {errors.memberName && <span className="pgm__register_error" role='alert'>{errors.memberName.message}</span>}
            <div>
              <Button type='submit' className="pgm__church_add_committee_member_form_button mx-auto" disabled={loading} variant="secondary">Add committee member</Button>

            </div>
          </Form>
        </div>
      }
    </div>
  )
}

export default AddCommitteMembers