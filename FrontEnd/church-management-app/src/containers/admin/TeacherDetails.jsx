import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectUser } from '../../features/user/userSlice'
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import axios from 'axios'

const TeacherDetails = () => {

  const [loading, setLoading] = useState(true)
  const [teacher, setTeacher] = useState()

  const user = useSelector(selectUser)

  const token = user.token

  const { SearchBar } = Search

  const columns = [
    { dataField: 'id', text: 'Sl No' },
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'phone', text: 'Phone' },
    { dataField: 'district', text: 'District' },
    { dataField: 'state', text: 'State' },
  ]

  // const pagination = paginationFactory({
  //     page:1,
  //     lastPageText:'<<',
  //     firstPageText:'>>',
  //     nextPageText:'<',
  //     alwaysShowAllBtns:true

  // })

  useEffect(() => {
    console.log('inside use effect')
    axios.get("http://localhost:4000/admin/full-teacher-details", { headers: { "authorization": `Bearer ${token}` } }).then(async(res) => {
      console.log(res.data)
      let data =await res.data.map((res, index) => {
        return {
          id: index + 1,
          name: res.lname + " " + res.fname,
          phone: res.address.phone,
          district: res.address.district,
          state: res.address.state
        }
      })
      setTeacher(data)
      setLoading(false)
    }).catch((err) => {
      console.log(err.message)
    })
  }, [loading])

  return (
    <div className="pgm__admin_teacher_details_container section__margin">
      {console.log('teacher details')}
      {teacher &&
        <ToolkitProvider className='pgm__member_table'
          keyField='id' columns={columns}
          data={teacher}
          search>
          {
            props => (
              <div className="pgm__member_search_table">
                <SearchBar {...props.searchProps} style={{ backgroundColor: 'transparent', borderColor: '#81AFDD', color: '#81AFDD' }} />
                <hr />
                <BootstrapTable {...props.baseProps} headerClasses='pgm__member_table_header' rowClasses='pgm__member_table_row' />
              </div>
            )
          }
        </ToolkitProvider>
      }
    </div>
  )
}

export default TeacherDetails