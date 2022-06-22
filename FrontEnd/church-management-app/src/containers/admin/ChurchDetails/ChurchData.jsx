import React from 'react'
import './churchDetails.css'
import { useLocation } from 'react-router-dom'
import RequestCard from '../../../components/card/RequestCard';
import Committee from '../../../assets/committee.png'
import Members from '../../../assets/memebrs.png'
import Revenue from '../../../assets/revenue.png'

const ChurchData = () => {

    const {state}=useLocation();

    const cardItems=[{
        id:1,
        name:"Members",
        url:"/admin/church-details/church-data/members",
        image:Members
      },
      {
        id:2,
        name:"Committee",
        url:"/admin/church-details/church-data/committee-members",
        image:Committee
      },
      {
        id:3,
        name:"Revenue Expense",
        url:"/admin/church-details/church-data/revenue-expense",
        image:Revenue
      },
    ]

  return (
    <div className="pgm__admin_church_data_container section__margin">
        {state && cardItems.map((item)=><RequestCard key={item.id} id={state.id} name={item.name} url={item.url} image={item.image} />)}
    </div>
  )
}

export default ChurchData