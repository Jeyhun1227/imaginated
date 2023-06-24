import React, { useState } from "react";
import { ThreeDots } from 'react-bootstrap-icons';
import axios from 'axios';
import OutsideClickHandler from 'react-outside-click-handler';


export default function SettingsPurchasesSettings({purchase, processRefundMain}) {
    const [showSettings, setShowSettings] = useState(false);

    return ( 
        <div className="flex py-3 border border-whisper padding-10" >
            <div>{purchase.name}</div>
            <div className="ml-auto" id='charge-amount'>    
                <div>${purchase.charge_amount / 100}</div>
            </div>
            <div className='margin-top-5 margin-left-10' onClick={()=> setShowSettings(true)} >
                <div className='cursor-point'><ThreeDots/></div>
                {showSettings &&
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setShowSettings(false)
                    }}
                >
                    <div className='absolute right-0 w-56 mt-2 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {purchase.refund_flag && <div className='hover:bg-white-smoke no-underline px-3.5 flex items-center margin-top-bottom' onClick={()=> processRefundMain(purchase.name, purchase.productid)}>Request a Refund</div>}
                    </div>
                </OutsideClickHandler>
                }
            </div>
        </div>
    );
}

