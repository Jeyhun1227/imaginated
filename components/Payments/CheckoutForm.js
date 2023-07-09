import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Imaginated_logo from '../../public/Imaginated_logo.png';
import Image from 'next/image'

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#dee2e6",
        fontFamily: 'Open Sans, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "black",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
      
    },
    hidePostalCode:true,
  };

  const cardBrandLogos = {
    visa: "/logos/visa-logo.png",
    mastercard: "/logos/mastercard-logo.png",
    amex: "/logos/amex-logo.png",
    discover: "/logos/discover-logo.png",
  };

  export default function CheckoutForm ({productID, prefilledCard, clientSecret}){
    const inputRef = useRef(null);
    const [success, setSuccess ] = useState(false)
    const [errorValues, setErrorValues ] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [prefillChange, setPrefillChange] = useState(false); 

    const stripe = useStripe()
    const elements = useElements()



    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        setIsLoading(true);
        // const  billing_details= {
        //   name: e.target.Full_Name.value,
        //   address:{
        //       line1: e.target.Address.value,
        //       state: e.target.State.value,
        //       postal_code: e.target.postal_code.value,
        //       city: event.target.City.value,
        //   }
        // }
        // const result = await elements.submit();
        // if (result.error) {
        //   setIsLoading(false);
        //   return console.log(result.error.message);
        // }
        // const {error, paymentMethod} = await stripe.createPaymentMethod({
        //   type: 'card',
        //   card: elements.getElement(PaymentElement),
        // })
        

        // if(error) return console.log(error.message);
        // // if(!e.target.Address.value) return setErrorValues("Please fillout field Address");
        // // if(!e.target.Full_Name.value) return setErrorValues("Please fillout field Full Name");
        // // if(!e.target.City.value) return setErrorValues("Please fillout field City");
        // // if(!e.target.State.value) return setErrorValues("Please fillout field State");
        // let stripe_data_values = null;
        // try{
        // const stripe_data = await axios.post("/api/payments/processing/", {
        //     billing_details: billing_details,
        //     productID,
        //     paymentMethod: paymentMethod.id
        // })

        // stripe_data_values = await stripe_data.data;
        // }catch(e){
        //   console.log('ERROR: ', e)
        //   return setErrorValues(e.response.data.error)
        // }
        // console.log('stripe_data_values: ', stripe_data_values)
        // if(stripe_data_values.status == 'requires_confirmation'){
            let resultcard = await stripe.confirmPayment({elements,      
              confirmParams: {
                return_url: window.location.href,
              },
            });
            console.log('resultcard: ', resultcard)
            if(resultcard.error) return setErrorValues(resultcard.error.message)
            if(resultcard.paymentIntent.status !== 'succeeded') {
                console.log("Unsuccessful payment: " + resultcard.paymentIntent)
                return setSuccess(true)
            }
            // try{
            //     let stsub = await  axios.post('/api/payments/verify/', 
            //     {  
            //       billing_details: billing_details,
            //       productID,
            //       paymentIntent: resultcard.paymentIntent.id,
            //       paymentMethod: id
            //     });
            //     stsub = await stsub.data;
            //     // localStorage.setItem("auth-token", stsub.token)
            //         // window.location.href = "/setup";
            //     console.log('stsub: ', stsub)
                
            // }catch(e){
            //     console.log('error_verification: ', e)
            //     setIsLoading(false);

            //     if(e) return setErrorValues(e)
            // }
            
        // }
        setIsLoading(false);

       return setSuccess(true)
    }

    const revertPrefillChange = () => {
      setPrefillChange(false)
    }


    const handleSubmitPrefilled = async (event) => {
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
  
        const client_secret = await response.data.client_secret;
  
  
  
        const result = await stripe.confirmPaymentIntent(client_secret, {
          return_url: window.location.href,
        });
        if(result.paymentIntent.status === 'succeeded') return window.location.reload();

        if (result.paymentIntent.next_action.type === 'redirect_to_url') {
          // Redirect the user to the URL provided in `result.next_action.redirect_to_url`
          window.location.href = result.paymentIntent.next_action.redirect_to_url.url;
        } 

      } catch (e) {
        if(e.message) setErrorValues(e.message)
        // if(e) setErrorValues(e)
        // Handle errors
        console.error('Error updating payment intent:', e);
      }
    };


    const prefilled_new_card = () => {
      if(prefillChange) return false;
      if(!prefilledCard) return false;
      return true;
    }

  return (<div>
    {prefilled_new_card() ?
      
      <form onSubmit={handleSubmitPrefilled}><div>
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
      </div></form>:
    <form onSubmit={handleSubmit} className='shop-checkout-card'>
    {/* <Image src={Imaginated_logo.src}  alt="Imaginated Logo" className="xl:h-10 sm:h-5 md:h-7" width={160} height={40}/>   */}
    <div className='margin-bottom-10 '><h3 className='shop-checkout-text'>Checkout</h3></div>
        {/* <input
          id="full-name"
          name="Full_Name"
          type="name"
          autoComplete="name"
          // onChange={(e) => setEmail(e.target.value)}
          required
          className="margin-bottom-10 relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Full Name"
        />
        <input
          id="address"
          name="Address"
          type="name"
          autoComplete="adress"
          // onChange={(e) => setEmail(e.target.value)}
          required
          className="margin-bottom-10 relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Address"
        />
        <input
          id="City"
          name="City"
          type="name"
          autoComplete="City"
          // onChange={(e) => setEmail(e.target.value)}
          required
          className="margin-bottom-10 relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="City"
        />
        <input
          id="state"
          name="State"
          type="name"
          autoComplete="State"
          // onChange={(e) => setEmail(e.target.value)}
          required
          className="margin-bottom-10 shop_payment_processing relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="State"
        />
        <input
          id="postal_code"
          name="postal_code"
          type="name"
          autoComplete="Postal Code"
          // onChange={(e) => setEmail(e.target.value)}
          required
          className="margin-bottom-10 relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Postal Code"
        /> */}
        <div className="">

        {/* <LinkAuthenticationElement id="link-authentication-element"
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        options={{defaultValues: {email: 'foo@bar.com'}}}
        /> */}
        <PaymentElement id="payment-element"  />
        </div>
        <div className='margin-top-20'>
        <div>{errorValues}</div>
        <div className='shop-purchase-container'>
        {(prefilledCard && <div className='shop-purchase-button inline-block background-grey' onClick={() => revertPrefillChange()} >Back</div>)}
        <button disabled={isLoading || !stripe || !elements} className='shop-purchase-button inline-block'>Purchase</button>
        </div>
        </div>
    </form>}
  </div>
  );
};


