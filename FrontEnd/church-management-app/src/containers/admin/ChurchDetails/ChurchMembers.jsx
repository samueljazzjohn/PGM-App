import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectUser } from '../../../features/user/userSlice'
import axios from 'axios'
import { DetailedShowBar } from '../../../components'

const ChurchMembers = () => {

    const [loading,setLoading]=useState(false)
    const [members,setMembers]=useState()

    const { state } = useLocation()

    const user=useSelector(selectUser)

    const token=user.token

    useEffect(() => {
        if(state){
            axios.get("http://localhost:4000/admin/member-details",{headers:{"authorization" : `Bearer ${token}`},body:{state}}).then((res) => {
                setMembers(res.data)
              }).catch((err) => {
                console.log(err.message)
              })
        }
    }, [loading])
    

    return (
        <div className="pgm__admin_church_members">
            {members && members.map((member)=><DetailedShowBar detail={false} key={member._id} name={member.memberName} state={setLoading}/>)}
        </div>
    )
}

export default ChurchMembers