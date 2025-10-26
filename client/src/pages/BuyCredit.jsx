import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import  axios  from 'axios';

const BuyCredit = () => {
  const { user, backendUrl, loadCreditData, token, setShowLogin } = useContext(AppContext);

  const navigate = useNavigate()

  const initPay = async (order) =>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payments',
      description : 'Credits Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async(response) => {
        try {
          if (!response.razorpay_order_id) {
            throw new Error('Order ID missing from response');
          }
          
          const {data} = await axios.post(backendUrl + '/api/user/verify-razor', 
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id
            },
            {headers: {token}}
          )
          
          if(data.success){
            toast.success('Payment successful! Credits added.')
            loadCreditData()
            navigate('/')
          } else {
            toast.error(data.message || 'Payment verification failed')
          }
        } catch (error) {
          console.error('Verification Error:', error);
          toast.error(error.response?.data?.message || error.message || 'Payment verification failed')
        }
      },
      modal: {
        ondismiss: function(){
          toast.info('Payment cancelled')
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorPay = async (planId) =>{
    try {
      if(!user){
        setShowLogin(true)
        return;
      }
    
     const {data}  =  await axios.post(backendUrl + '/api/user/pay-razor', {planId}, {headers : {token}})

     if(data.success){
      initPay(data.order)
     }
    } catch (error) {
      console.error('Backend Error:', error.response?.data);
      toast.error(error.response?.data?.message || error.message)
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-14 mb-10 "
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the plan
      </h1>

      <div className="flex flex-wrap gap-6 justify-center text-left">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold">{plan.id}</p>
            <p className="text-sm">{plan.desc} </p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${plan.price}</span>/
              {plan.credits} credits{" "}
            </p>
            <button onClick={ ()=>paymentRazorPay(plan.id) } className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52">
              {user ? "Purchase" : "Get Started"}{" "}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
