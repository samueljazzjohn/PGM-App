import React from 'react'
import './dashboardTab.css'
import { useNavigate,Link } from 'react-router-dom'

const DashboardTab = (props) => {

  const navigate=useNavigate()

  // const navigateHome=(url)=>{
  //   console.log(url)
  //   navigate(url)
  // }

  return (
    <div className="pgm__dashbard_tab_containers">
      <ul className="pgm__dashboard_link_container">
        {
        console.log(props.items)}
        {
        props.items.map((item)=>
          <Link to={item.url}>
            <li className="pgm__dashboard_link"><item.icon className='pgm__dashboard_item_icon'/>{item.item}</li>
          </Link>
        )}
      </ul>
    </div>
  )
}

export default DashboardTab