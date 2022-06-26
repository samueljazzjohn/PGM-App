import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectUser } from '../../features/user/userSlice'
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import axios from 'axios'

const ViewStudents = () => {

    const [loading,setLoading]=useState(false)
    const [student,setStudent]=useState()

    const user=useSelector(selectUser)

    const token=user.token

    const {SearchBar} =Search

    const columns=[
      {dataField:'id',text:'Sl No'},
      {dataField:'name',text:'Name',sort:true},
      // {dataField:'fname',text:'Last Name',sort:true},
      {dataField:'phone',text:'Phone'},
      {dataField:'course',text:'Course'},
      {dataField:'district',text:'District'},
      {dataField:'state',text:'State'},
      {dataField:'batch',text:'Batch'},
    ]

    // const pagination = paginationFactory({
    //     page:1,
    //     lastPageText:'<<',
    //     firstPageText:'>>',
    //     nextPageText:'<',
    //     alwaysShowAllBtns:true

    // })

    useEffect(() => {
            axios.get("http://localhost:4000/teacher/full-student-details",{headers:{"authorization" : `Bearer ${token}`}}).then((res) => {
                let data=res.data.map((res,index)=>{return {id:index+1,
                  name:res.lname+" "+res.fname,
                  phone:res.address.phone,
                  course:res.course,
                  batch:res.batch,
                  district:res.address.district,
                  state:res.address.state}})
                console.log(data)
                setStudent(data)
              }).catch((err) => {
                console.log(err.message)
              })
    },[])
    
  return (
    <div className="pgm__admin_student_container">
            {student &&
            <ToolkitProvider className='pgm__member_table' 
            keyField='id' columns={columns} 
            data={student} 
            search>
                {
                    props => (
                        <div className="pgm__member_search_table">
                            <SearchBar { ...props.searchProps } style={{backgroundColor:'transparent',borderColor:'#81AFDD',color:'#81AFDD'}} />
                            <hr />
                            <BootstrapTable { ...props.baseProps } headerClasses='pgm__member_table_header' rowClasses='pgm__member_table_row' />
                        </div>
                    )
                }
            </ToolkitProvider>
             }        
        </div>
  )
}

export default ViewStudents