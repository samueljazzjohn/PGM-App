import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { BiShow } from 'react-icons/bi'
import { Button, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { DetailedShowBar } from '../../../components'
import axios from 'axios'
import { useSelector } from 'react-redux/es/exports'
import { selectUser } from '../../../features/user/userSlice'
import ShowModel from '../../../components/showBars/ShowModel'

const ChurchDetails = () => {

  const user=useSelector(selectUser)

  const token=user.token

  const [loading,setLoading]=useState(false)

  const [church, setChurch] = useState()

  useEffect(() => {
    axios.get("http://localhost:4000/admin/full-church-details",{headers:{"authorization" : `Bearer ${token}`}}).then((res) => {
      setChurch(res.data)
    }).catch((err) => {
      console.log(err.message)
    })
  },[loading])

  return (
   <div className="pgm__church_details_container section__margin">
    <ShowModel />
     <div className="pgm__church_show_church">
          <div className="pgm__church_show_church_header">
            <p>Churches</p>
          </div>
          <div className="pgm__church_show">
            {church && church.map((church) => <DetailedShowBar key={church._id} details={true} url="http://localhost:4000/admin/remove-church" name={church.username} id={church._id} state={setLoading} type={church.type} email={church.email} />)}
          </div>
        </div>
   </div>
  )
}

export default ChurchDetails