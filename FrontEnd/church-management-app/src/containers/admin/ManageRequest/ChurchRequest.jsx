import React,{useEffect,useState} from 'react'
import ShowRequestBar from '../../../components/showBars/ShowRequestBar'
import axios from 'axios'
import ShowModel from '../../../components/showBars/ShowModel'

const ChurchRequest = () => {

  const [churchDetails,setChurchDetails]=useState()

  const [isDataSet,setIsDataSet]=useState(false)

  useEffect(() => {
    axios.get('http://localhost:4000/admin/church-details').then((res)=>{
      setChurchDetails(res.data)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }, [isDataSet])
  

  return (
    <div className="pgm__church_request_container">
      <ShowModel />
      {churchDetails && churchDetails.map((church)=> <ShowRequestBar key={church._id} name={church.username} state={setIsDataSet} id={church._id} type={church.type} />)}
    </div>
  )
}

export default ChurchRequest