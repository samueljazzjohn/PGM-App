import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { BiShow } from 'react-icons/bi'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ShowBar } from '../../components'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { selectUser } from '../../features/user/userSlice'
import './church.css'

const AddRevenueExp = () => {

    var max = new Date().getFullYear()
    var min = max - 10
    var years = []

    for (var i = max; i >= min; i--) {
        years.push(i)
    }

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const MySwal = withReactContent(Swal)

    const token = user.token

    const { register, handleSubmit, formState: { errors }, reset } = useForm()


    const onSubmit = (data) => {
        console.log(data)
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Add'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("http://localhost:4000/church/add-revenue-expense", data, { headers: { "authorization": `Bearer ${token}` } }).then(() => {
                    Swal.fire(
                        'Added!',
                        'Revunue Expense details added',
                        'success'
                    )
                }).catch((err) => {
                    console.log(err)
                    Swal.fire(
                        'Error!',
                        'Data is already added for specified date',
                        'error'
                    )
                })
            }
        })
        reset(data)
    }

    return (
        <div className="pgm__church_add_revenue_exp_container">
            <div className="pgm__church_add_revenue_exp_form_container section__padding">
                <div className="pgm__church_revenue_exp_form_header">
                    <h5>Add Revenue Exhpense Details</h5>
                </div>
                <Form method='POST' className='pgm__church_add_revenue_exp_form' onSubmit={handleSubmit(onSubmit)}>
                    {/* <Row> */}
                    <label className='pgm__church_form_label' htmlFor="course">Enter revenue :</label>
                    <Form.Control className="pgm__church-form-inputText" type='number' placeholder='Revenue' {...register('revenue', { required: "Revenue do not empty" })}></Form.Control>
                    {errors.revenue && <span className='pgm__church_form_error' role='alert'>{errors.revenue.message}</span>}
                    {/* </Row>
                    <Row> */}
                    <label className='pgm__church_form_label' htmlFor="venue">Enter Expense :</label>
                    <Form.Control className="pgm__church-form-inputText" type='number' placeholder='Expense' {...register('expense', { required: "expense do not empty" })}></Form.Control>
                    {errors.expense && <span className='pgm__church_form_error' role='alert'>{errors.expense.message}</span>}
                    {/* </Row> */}
                    <Row>
                        <Col>
                            <label className='pgm__church_form_label' htmlFor="name">Select Year :</label>
                            <Form.Select aria-label="Default select" className='pgm__church-form-inputText' {...register('year', {
                                required: true,
                                validate: (year) => {
                                    if (year == "--select year--") {
                                        return "Select a year"
                                    }
                                }
                            })}>
                                <option>--select year--</option>
                                {/* {years && console.log(years)} */}
                                {years && years.map((year) => <option key={year}>{year}</option>)}
                            </Form.Select>
                            {errors.year && <span className="pgm__register_error" role='alert'>{errors.year.message}</span>}
                        </Col>
                        <Col>
                            <label className='pgm__church_form_label' htmlFor="name">Select Month :</label>
                            <Form.Select aria-label="Default select" className='pgm__church-form-inputText' {...register('month', {
                                required: true,
                                validate: (month) => {
                                    if (month == "--select month--") {
                                        return "Select a month"
                                    }
                                }
                            })}>
                                <option>--select month--</option>
                                {/* {months && console.log(months)} */}
                                {months && months.map((month) => <option key={month}>{month}</option>)}
                            </Form.Select>
                            {errors.year && <span className="pgm__register_error" role='alert'>{errors.year.message}</span>}
                        </Col>
                    </Row>
                    <div>
                        <Button type='submit' className="pgm__church_add_revenue_exp_form_button mx-auto" variant="secondary">Add</Button>

                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AddRevenueExp