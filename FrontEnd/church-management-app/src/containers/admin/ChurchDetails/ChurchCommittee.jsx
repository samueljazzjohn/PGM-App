import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { DetailedShowBar } from '../../../components'
import axios from 'axios'
import { selectUser } from '../../../features/user/userSlice'
import { useSelector } from 'react-redux'
import './churchDetails.css'


const ChurchCommittee = () => {

  const [committee,setCommittee]=useState()

    const {state} = useLocation()

    // const user=useSelector(selectUser)

    // const token=user.token

    useEffect(() => {
      if(state){
        axios.get("http://localhost:4000/admin/get-committee-members",{params:state}).then((res) => {
          console.log(res.data)
          setCommittee(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }
    },[])
    
  return (
    <div className="pgm__church_committee_members section__margin">
      {committee&&console.log(committee)}
      {committee && <div className="pgm__church_committee">
      <div className="pgm__church_show_committe_member_header">
              {/* <p>Committee Members</p> */}
            </div>
            <div className="pgm__church_show">
              {
                 committee.president &&
              <div className="pgm__church_committee_president">
                <h5>President</h5>
              <DetailedShowBar details={false}  position="president" name={committee.president} />
              </div>
              }
              {
                committee.secretary && 
              <div className="pgm__church_committee_president">
                <h5>Secretary</h5>
              <DetailedShowBar details={false}  position="secretary" name={committee.secretary} />
              </div>
              }
              {
                 committee.treasurer && 
              <div className="pgm__church_committee_president">
                <h5>Treasurer</h5>
              <DetailedShowBar details={false}  position="treasurer" name={committee.treasurer} />
              </div>
              }
              {
                committee.otherMembers.length>0 && 
              <div className="pgm__church_committee_president">
                <h5>Other Members</h5>
                {committee.otherMembers.map((member)=><DetailedShowBar details={false}  position="otherMembers" name={member} />)}
              </div>
              }
            </div>
      </div> }
      {!committee && <div className="pgm__church_no_committee section__margin section__padding"> <p>No committee members</p> </div> }
    </div>
  )
}

export default ChurchCommittee