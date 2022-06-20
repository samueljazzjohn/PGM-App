import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import { BiShow } from 'react-icons/bi'
import { Button, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ShowBar } from '../../components'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import './church.css'

const AddRevenueExp = () => {

    //   const loading=useSelector(selectLoading)
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, reset } = useForm()


    const onSubmit = (data) => {
        console.log(data)
        // dispatch(addCourse({data,toast,setIsButtonClicked}))
        reset(data)
    }

    return (
        <div className="pgm__church_add_revenue_exp_container">
            <div className="pgm__church_add_revenue_exp_form_container section__padding">
                <div className="pgm__church_revenue_exp_form_header">
                    <h5>Add Revenue Exhpense Details</h5>
                </div>
                <Form method='POST' className='pgm__church_add_revenue_exp_form' onSubmit={handleSubmit(onSubmit)}>
                    <label className='pgm__church_form_label' htmlFor="course">Enter revenue :</label>
                    <Form.Control className="pgm__church-form-inputText" type='text' placeholder='revenue' {...register('revenue', { required: "Revenue do not empty" })}></Form.Control>
                    {errors.revenue && <span className='pgm__church_form_error' role='alert'>{errors.revenue.message}</span>}
                    <label className='pgm__church_form_label' htmlFor="venue">Enter the venue :</label>
                    <Form.Control className="pgm__church-form-inputText" type='text' placeholder='Expense' {...register('expense', { required: "expense do not empty" })}></Form.Control>
                    {errors.expense && <span className='pgm__church_form_error' role='alert'>{errors.expense.message}</span>}
                    <label className='pgm__church_form_label' htmlFor="date">Enter the date :</label>
                    <Form.Control className="pgm__church-form-inputText" type='date'{...register('date', { required: "date do not empty" })}></Form.Control>
                    {errors.date && <span className='pgm__church_form_error' role='alert'>{errors.date.message}</span>}
                    <div>
                        <Button type='submit' className="pgm__church_add_revenue_exp_form_button mx-auto" variant="secondary">Add revenue_exp</Button>

                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AddRevenueExp