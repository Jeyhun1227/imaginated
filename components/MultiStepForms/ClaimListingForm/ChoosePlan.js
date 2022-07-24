import React, { useEffect, useState } from "react";
import { RadioGroup } from '@headlessui/react'

export default function ChoosePlan() {
  let [plan, setPlan] = useState('Verified')

  return (
    <div className="w-full bg-white">
      <div className="px-4 sm:px-0">
        <div className="max-w-4xl py-12 mx-auto sm:mx-0">
          <div className="pb-12 sm:py-12">
            <div className="text-center">
                <h1 className="font-bold"> Choose a Plan </h1>
            </div>
            <div className="flex flex-row items-center justify-center px-8 py-8 rounded-full bg-light-grey">
              <RadioGroup value={plan} onChange={setPlan} className="flex flex-row items-center justify-center w-full space-x-4">
                <RadioGroup.Label className="mr-auto text-3xl font-semibold text-left">Membership</RadioGroup.Label>
                <RadioGroup.Option value="Verified">
                  {({ checked }) => (
                    <span className={`inline-flex justify-center py-1 text-sm font-medium border border-transparent rounded-full px-10 ${checked ? 'bg-dark-blue text-white' : ' bg-white text-dark-blue'}`}>
                      Startup
                      <span className="absolute -bottom-1 text-dark-blue">
                        $0/Mo
                      </span>
                    </span>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value="business">
                  {({ checked }) => (
                    <span className={`inline-flex justify-center py-1 text-sm font-medium border border-transparent rounded-full px-10 ${checked ? 'bg-dark-blue text-white' : ' bg-white text-dark-blue'}`}>
                      Business
                      <span className="absolute -bottom-1 text-dark-blue">
                        $20/Mo
                      </span>
                    </span>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value="enterprise">
                  {({ checked }) => (
                    <span className={`inline-flex justify-center py-1 text-sm font-medium border border-transparent rounded-full px-10 ${checked ? 'bg-dark-blue text-white' : ' bg-white text-dark-blue'}`}>
                      Enterprise
                      <span className="absolute -bottom-1 text-dark-blue">
                        $100/Mo
                      </span>
                    </span>
                  )}
                </RadioGroup.Option>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
        
                
    );

}