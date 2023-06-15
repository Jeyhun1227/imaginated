import React, { useRef, useEffect, useState } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe, CardIcon} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';
import Modal from 'react-modal';
import Image from 'next/image'

const stripePromise = loadStripe("pk_test_51N8GfXHnVIn1RPeHqNoj7E4egzeS6pNGaugcuwqtRg3Kg1EbM83ntHgRIdNkCgKc7AAh9EhMAlXDXV0q7sb81p9Y00FKYloLNm");


export default function Payment_processing({paymentProcessing, paymentProcessingClose, alreadyOwnedFunc, productID}) {
  const [processPayments, setProcessPayments] = useState(false);
  const [ clientSecret, setClientSecret ] = useState();
  const [prefilledCard, setPrefilledCard] = useState(null); 
  const [prefillChange, setPrefillChange] = useState(false); 
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
  const cardBrandLogos = {
    visa: "/logos/visa-logo.png",
    mastercard: "/logos/mastercard-logo.png",
    amex: "/logos/amex-logo.png",
    discover: "/logos/discover-logo.png",
  };


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
  
  
  const prefilled_new_card = () => {
    if(prefillChange) return false;
    if(!prefilledCard) return false;
    return true;
  }

  const revertPrefillChange = () => {
    setPrefillChange(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Get the selected payment method ID
    const selectedPaymentMethodId = prefilledCard.id;
    
    try {
      // Send a request to your API to update the payment intent with the selected payment method
      const response = await axios.post('/api/payments/update-payment-intent', {
        paymentMethodId: selectedPaymentMethodId,
        productID,
        clientSecret: clientSecret
      });
      
      // Handle the response as needed
      console.log('Payment intent updated successfully:', response.data);
    } catch (e) {
      if(e.message) setErrorValues(e.message)
      // if(e) setErrorValues(e)
      // Handle errors
      console.error('Error updating payment intent:', e);
    }
  };

  const modalStyles = {
    content: {
      maxWidth: '500px',
      maxHeight: '500px',
      margin: '0 auto',
    },
  };
  

  return (
    <Modal
    isOpen={processPayments}
    onRequestClose={closeModal}
    contentLabel="Checkout Modal"
    style={modalStyles}
    >
      <div className="shop-main-cart-checkout">
      {prefilled_new_card() ?
      
        <form onSubmit={handleSubmit}><div>
          <h3 className='shop-checkout-text'>Checkout</h3>
          
          <div className='shop-card-prefill-container'>
            <Image className='inline-block' src={cardBrandLogos[prefilledCard.brand] ? cardBrandLogos[prefilledCard.brand] : "/images/card-other.png"} alt={prefilledCard.brand} width={30} height={20} />
            <div className='inline-block margin-left-10'>**** {prefilledCard.last4}</div>
            <button className='shop-button-change' onClick={()=> setPrefillChange(true)}>Change</button>
          </div>
          <div>{errorValues}</div>
          <div className='shop-purchase-container'>
            <button  className='shop-purchase-button inline-block'>Purchase</button>
          </div>
        </div></form>:  <div>{(clientSecret && <div>       
        <Elements stripe={stripePromise} options={{ clientSecret, }}>
            <CheckoutForm prefilledCard={prefilledCard} productID={'prod_O0OuWo0RQ1B1G6'} revertPrefillChange={revertPrefillChange}/>
        </Elements></div>)}</div>
        }

    </div>
    </Modal>
  );
};

