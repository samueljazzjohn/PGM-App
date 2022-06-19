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
        <div className="pgm__church_add_revenue_exp_container section__margin ">
            <div className="pgm__church_add_revenue_exp_form_container section__padding">
                <Form method='POST' className='pgm__church_add_revenue_exp_form' onSubmit={handleSubmit(onSubmit)}>
                    <label className='pgm__church_form_label' htmlFor="course">Enter the revenue_exp name :</label>
                    <Form.Control className="pgm__church-form-inputText" type='text' placeholder='revenue_exp' {...register('revenue_expName', { required: "Course do not empty" })}></Form.Control>
                    {errors.revenue_expName && <span className='pgm__church_form_error' role='alert'>{errors.revenue_expName.message}</span>}
                    <label className='pgm__church_form_label' htmlFor="venue">Enter the venue :</label>
                    <Form.Control className="pgm__church-form-inputText" type='text' placeholder='venue' {...register('venue', { required: "venue do not empty" })}></Form.Control>
                    {errors.venue && <span className='pgm__church_form_error' role='alert'>{errors.venue.message}</span>}
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