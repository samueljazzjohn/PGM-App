import React,{useState} from 'react'
import './donatepage.css'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import validator from 'validator'
import axios from 'axios'
import {toast} from 'react-toastify'

function loadScript(src) {

	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'

const DonatePage = () => {

  const [loading,setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  // const onSubmit = (data) => {

  // }

  async function displayRazorpay(body) {

    setLoading(true)

		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			// alert('Razorpay SDK failed to load. Are you online?')
      toast.error('Razorpay SDK failed to load. Are you online?')
      setLoading(false)
			return
		}

		const data = await axios.post('http://localhost:4000/razorpay',body).then((res)=>{
      return res.data
    }).catch((err)=>{
      toast.error('Server error please try again later')
      setLoading(false)
      return
    })

		console.log(data)

		const options = {
			key: __DEV__ ? 'rzp_test_sXKQQZTPC4zOMu' : 'PRODUCTION_KEY',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Donation',
			description: 'Thank you for nothing. Please give us some money',
			image: '',
			handler: function (response) {
        // axios.post('http://localhost:4000/payment/complete',{data}).then((res)=>{
        //   console.log(response)
        //   setLoading(false)
        //   reset({phone:'',name:'',email:'',amount:''})
        //   toast.success('Payment success')
        // }).catch((err)=>{
        //   console.log(err)
        // })
        console.log(response)
          setLoading(false)
          reset({phone:'',name:'',email:'',amount:''})
          toast.success('Payment success')
			},
			prefill: {
				name:data.donator,
				email: data.email,
				phone_number: data.phone
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
    setLoading(false)
	}

  return (
    <div className='donate_page_container section__margin'>
      <div className="donate_page-header">
        <h1 className='gradient__text'>Payment Details</h1>
        <div className="pgm__events-header-bar"></div>
      </div>
      <div className="donate_page-content-container">
        <div className="donate_page-content">

        </div>
        <div className="donate_page-form-container">
          <Form method='POST' className='pgm__admin_add_event_form' onSubmit={handleSubmit(displayRazorpay)}>
            <label className='pgm_donation_form-label' htmlFor="name">Enter the amount :</label>
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='Amount' {...register('amount', { required: "Amount cannot be empty",})} />
            {errors.amount && <span className="pgm__register_error" role='alert'>{errors.amount.message}</span>}
            <label className='pgm_donation_form-label' htmlFor="name">Enter your name :</label>
            <Form.Control className="pgm__contact-form-inputText" type='text' placeholder='Name' {...register('name', { required: "Course do not empty" })}></Form.Control>
            {errors.name && <span className='pgm__admin_form_error' role='alert'>{errors.name.message}</span>}
            <label className='pgm_donation_form-label' htmlFor="name">Enter your email :</label>
            <Form.Control type='email' className='pgm__contact-form-inputText' placeholder='Email address'
              {...register("email", {
                required: "email required",
                validate: (email) => {
                  if (!validator.isEmail(email)) {
                    return "Please enter valid email"
                  }
                }
              })} />
            {errors.email && <span className="pgm__register_error" role='alert'>{errors.email.message}</span>}
            <label className='pgm_donation_form-label' htmlFor="date">Enter the phone number :</label>
            <Form.Control type='text' className='pgm__contact-form-inputText' placeholder='Phone number' {...register('phone', {
              required: true, minLength: { value: 10, message: "Your phone number must be atleast 10 numbers" },
              //  valueAsNumber: "Please enter a valid phone number",
              maxLength: { value: 10, message: "Enter a valid phone" }
            })} />
            {errors.phone && <span className="pgm__register_error" role='alert'>{errors.phone.message}</span>}
            <div>
              <Button type='submit' className="pgm_donate_button mx-auto" variant="secondary" type='submit' disabled={loading}>Donate</Button>

            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default DonatePage