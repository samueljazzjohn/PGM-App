import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectUser } from '../../../features/user/userSlice'
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import axios from 'axios'

const RevenueExpense = () => {

  const [loading,setLoading]=useState(false)
  const [revenue,setRevenue]=useState()

  const { state } = useLocation()

  const user=useSelector(selectUser)

  const token=user.token

  const {SearchBar} =Search

  const columns=[
      {dataField:'id',text:'Sl No'},
      {dataField:'year',text:'Year',sort:true},
      {dataField:'month',text:'Month'},
      {dataField:'revenue',text:'Revenue'},
      {dataField:'expense',text:'Expense'},
  ]

  // const pagination = paginationFactory({
  //     page:1,
  //     lastPageText:'<<',
  //     firstPageText:'>>',
  //     nextPageText:'<',
  //     alwaysShowAllBtns:true

  // })

  useEffect(() => {
      if(state){
          axios.get("http://localhost:4000/admin/get-revenue-expense",{params:state}).then((res) => {
              let data=res.data.map((res,index)=>{return {...res,id:index+1}})
              console.log(data)
              setRevenue(data)
            }).catch((err) => {
              console.log(err.message)
            })
      }
  }, [loading])

  return (
    <div className="pgm__admin_church_members section__margin">
            {revenue &&
            <ToolkitProvider className='pgm__member_table' 
            keyField='id' columns={columns} 
            data={revenue} 
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

export default RevenueExpense