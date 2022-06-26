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
import { DetailedShowBar } from '../../../components'

const ChurchMembers = () => {

    const [loading,setLoading]=useState(false)
    const [members,setMembers]=useState()

    const { state } = useLocation()

    const user=useSelector(selectUser)

    const token=user.token

    const {SearchBar} =Search

    const columns=[
        {dataField:'id',text:'Sl No'},
        {dataField:'memberName',text:'Member Name',sort:true},
        {dataField:'phone',text:'phone'},
        {dataField:'isBaptized',text:'Baptized'},
        {dataField:'maritalStatus',text:'Marital Status'},
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
            axios.get("http://localhost:4000/admin/member-details",{params:state}).then((res) => {
                let data=res.data.map((res,index)=>{return {...res,id:index+1}})
                console.log(data)
                setMembers(data)
              }).catch((err) => {
                console.log(err.message)
              })
        }
    }, [loading])
    

    return (
        <div className="pgm__admin_church_members section__margin">
            {members &&
            <ToolkitProvider className='pgm__member_table' 
            keyField='id' columns={columns} 
            data={members} 
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

export default ChurchMembers