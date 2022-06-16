import React from 'react'
import '../admin.css'
import RequestCard from '../../../components/card/RequestCard'
import student from '../../../assets/graduate1.png'
import teacher from '../../../assets/educator1.png'
import church from '../../../assets/church1.png'

const ManageRequestHome = () => {
    const cardItems=[{
        id:1,
        name:"Church",
        url:"/admin/manage-request/church-request",
        image:church
      },
      {
        id:2,
        name:"Student",
        url:"/admin/manage-request/student-request",
        image:student
      },
      {
        id:3,
        name:"Teacher",
        url:"/admin/manage-request/teacher-request",
        image:teacher
      },
    ]
  return (
    <div className='pgm__manage_request_home_container'>
      { cardItems.map((item)=><RequestCard key={item.id} name={item.name} image={item.image} url={item.url} />)}
    </div>
  )
}

export default ManageRequestHome