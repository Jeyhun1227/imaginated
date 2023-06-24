import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { ThreeDots } from 'react-bootstrap-icons';
import { Rating} from '@mui/material';
import { Disclosure, Transition } from '@headlessui/react'
import UserReview from '../../Form/UserReview';
import axios from 'axios';
import SettingsPurchasesSettings from './SettingsPurchasesSetting';
import Modal from 'react-modal';

export default function SettingsPurchases({purchases}) {
    const [processRefund, setProcessRefund] = useState(false);
    const [refundTitle, setRefundTitle] = useState();
    const [refundProductId, setRefundProductId] = useState();
    const handleSubmitRefund = (e) => {
        e.preventDefault();
        console.log('e.target.Address.value,: ', e.target.reason.value, refundProductId, refundTitle)
    }

    const modalStyles = {
        content: {
          maxWidth: '500px',
          maxHeight: '500px',
          margin: '0 auto',
        },
      };
      const closeModal = () => {
        setProcessRefund(false)
      }
      const processRefundMain = (title, productId) => {
          console.log('processRefundMain: ', title, productId)
          setProcessRefund(true)
          setRefundTitle(title)
          setRefundProductId(productId)
      }

    return ( 
        <div>
            <Modal
            ariaHideApp={false}
            isOpen={processRefund}
            onRequestClose={closeModal}
            contentLabel="Checkout Modal"
            style={modalStyles}
            >         
                <div className='margin-bottom-10 '><h3 className='shop-checkout-text'>Refund for</h3></div>
                <form onSubmit={handleSubmitRefund} className='shop-checkout-card'>
                    <h5 className='shop-checkout-text inline-block'>Product: {refundTitle}</h5>
                    <div className='margin-tb15'>Please provide a reason for this refund below: </div>
                    <textarea
                    id="reason"
                    name="reason"
                    autoComplete="reason"
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                    className="margin-bottom-10 relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Refund Reason"
                    />
                    <div className='shop-purchase-container'>
                        <button className='shop-purchase-button inline-block'>Submit</button>
                    </div>

                </form>
          </Modal>
        <div className="flex flex-col space-y-6">

            <Disclosure as="div" className="border border-whisper lg:h-full">
            {({ open }) => (
                <>
                <div className="p-3">
                    
                    <Disclosure.Button as="div" className="flex items-center justify-between w-full">
                    <h4 className="mb-0">Purchases</h4>

                    </Disclosure.Button>
                    <ul className="pl-0 divide-y divide-whisper">
                        <li className="flex py-3" >
                            <div className="flex flex-col flex-1 space-y-2">
                                <div className="flex flex-row flex-wrap">
                                    <p className="mb-0 font-semibold">Your Purchases</p>
                                </div>
                                <div className="">
                                {purchases && purchases.map((pur) => <SettingsPurchasesSettings purchase={pur} key={pur.productid} processRefundMain={processRefundMain}/> )}
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>
                </>)}
            </Disclosure>
        </div> 
        </div>

    );
}
