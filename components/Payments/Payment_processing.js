import React, { useRef, useEffect, useState } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe, CardIcon} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import Modal from 'react-modal';
import Image from 'next/image'
import { useStripe } from "@stripe/react-stripe-js"

const stripePromise = loadStripe("pk_test_51N8GfXHnVIn1RPeHqNoj7E4egzeS6pNGaugcuwqtRg3Kg1EbM83ntHgRIdNkCgKc7AAh9EhMAlXDXV0q7sb81p9Y00FKYloLNm");


export default function Payment_processing({paymentProcessing, paymentProcessingClose, alreadyOwnedFunc, productID}) {
  const [processPayments, setProcessPayments] = useState(false);
  const [ clientSecret, setClientSecret ] = useState();
  const [prefilledCard, setPrefilledCard] = useState(null); 
  const [errorValues, setErrorValues] = useState();

  const fetchCustomerPaymentMethods = async (payment_methods) => {
    if(payment_methods.brand)
    setPrefilledCard(payment_methods)
  };
  
  const create_payment_intent = async () => {
    const create_payment = await  axios.post('/api/payments/create-payment-intent', {productID});
    const create_payment_data = await create_payment.data;
    if(create_payment_data.alreadyOwned) return alreadyOwnedFunc()
    console.log('create_payment_data: ', create_payment_data)
    fetchCustomerPaymentMethods(create_payment_data.payment_methods)

    // if(create_payment_data.customerid) return fetchCustomerPaymentMethods(create_payment_data.customerid)
    setClientSecret(create_payment_data.client_secret)

  }


  useEffect(() => {
    create_payment_intent()
  }, []);

  useEffect(() => {
    setProcessPayments(paymentProcessing)
  }, [paymentProcessing]);
  const create_account = async () => {
    let stsub = await  axios.post('/api/payments/account_creation', 
    {  
    });
  };
  // const openModal = () => {
  //   setProcessPayments(true);
  // }
  const closeModal = () => {
    // setProcessPayments(false)
    paymentProcessingClose()
  }
  


  const modalStyles = {
    content: {
      maxWidth: '500px',
      maxHeight: '500px',
      margin: '0 auto',
    },
  };
  

  return (
    <Modal
    ariaHideApp={false}
    isOpen={processPayments}
    onRequestClose={closeModal}
    contentLabel="Checkout Modal"
    style={modalStyles}
    >
      <div className="shop-main-cart-checkout">
      <div>{(clientSecret && <div>       
        <Elements stripe={stripePromise} options={{ clientSecret, }}>
            <CheckoutForm prefilledCard={prefilledCard} productID={productID} clientSecret={clientSecret}/>
        </Elements></div>)}</div>
      

    </div>
    </Modal>
  );
};

