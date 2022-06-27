import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { selectUser } from '../../features/user/userSlice'
import ShowQuestion from '../../components/showBars/ShowQuestion'

const ViewNotification = () => {

    const [loading,setLoading] =useState(false)

    const [notifications,setNotifications] = useState()

    const user=useSelector(selectUser)

    const token=user.token

    useEffect(() => {
        axios.get("http://localhost:4000/student/view-notification",{ headers: { "authorization": `Bearer ${token}` } }).then((res) => {
          setNotifications(res.data)
          console.log(res.data)
        }).catch((err) => {
          console.log(err.message)
        })
      }, [loading])

  return (
    <div className="pgm__notification_container section__margin">
        <div className="pgm__admin_show_course_header">
            <p>Notifications</p>
          </div>
          <div className="pgm__admin_show">
            {notifications && notifications.map((notification,index) => <ShowQuestion key={notification._id} name={index+1} course={notification.title} question={notification.message} date={notification.date} state={setLoading} />)}
          </div>
    </div>
  )
}

export default ViewNotification