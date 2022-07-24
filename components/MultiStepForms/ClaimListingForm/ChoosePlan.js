import React, { useEffect, useState } from "react";
import { RadioGroup } from '@headlessui/react'
import { CheckLg } from 'react-bootstrap-icons';


export default function ChoosePlan(props) {
  let [plan, setPlan] = useState('Verified')

  return (
    <div className="w-full bg-white ">
      <div className="px-4 sm:px-0">
        <div className="max-w-4xl py-12 mx-auto sm:mx-0">
          <div className="pb-12 sm:py-12">
            <div className="text-center">
                <h1 className="font-bold"> Choose a Plan </h1>
            </div>
            <div className="px-8 pt-8 pb-3 rounded-full bg-light-grey">
              <RadioGroup value={plan} onChange={setPlan} className="flex flex-row items-center justify-center w-full space-x-4">
                <RadioGroup.Label className="mr-auto text-3xl font-semibold text-left">Membership</RadioGroup.Label>
                <RadioGroup.Option value="Verified">
                  {({ checked }) => (
                    <span className={`cursor-pointer overflow-visible inline-flex justify-center py-1 text-sm font-medium border border-transparent rounded-full px-10 ${checked ? 'bg-dark-blue text-white' : ' bg-white text-dark-blue'}`}>
                      Verified
                    </span>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value="business">
                  {({ checked }) => (
                    <span className={`cursor-pointer inline-flex justify-center py-1 text-sm font-medium border border-transparent rounded-full px-10 ${checked ? 'bg-dark-blue text-white' : ' bg-white text-dark-blue'}`}>
                      Business
                    </span>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value="enterprise">
                  {({ checked }) => (
                    <span className={`cursor-pointer inline-flex justify-center py-1 text-sm font-medium border border-transparent rounded-full px-10 ${checked ? 'bg-dark-blue text-white' : ' bg-white text-dark-blue'}`}>
                      Enterprise
                    </span>
                  )}
                </RadioGroup.Option>
              </RadioGroup>
              <div className="flex flex-row items-center justify-center w-full space-x-24">
                <span className="ml-auto text-dark-blue">
                  $0/Mo
                </span>
                <span className=" text-dark-blue">
                  $20/Mo
                </span>
                <span className="pr-8 text-dark-blue">
                  $100/Mo
                </span>
              </div>
            </div>
            <div className="flex flex-col mx-8 mt-12 space-y-10">
              <div className="flex flex-row items-center justify-center w-full pb-2 border-b-2 border-whisper">
                <span className="mr-auto text-lg">Manage your profile</span>
                <div className="flex flex-row space-x-28">
                  <span className="pr-3"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                  <span className="pr-4"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                  <span className="pr-16"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center w-full pb-2 border-b-2 border-whisper">
                <span className="mr-auto text-lg">Manage your profile</span>
                <div className="flex flex-row space-x-28">
                  <span className="pr-3"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                  <span className="pr-4"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                  <span className="pr-16"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center w-full pb-2 border-b-2 border-whisper">
                <span className="mr-auto text-lg">Manage your profile</span>
                <div className="flex flex-row space-x-28">
                  <span className="pr-3"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                  <span className="pr-4"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                  <span className="pr-16"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse justify-between py-12 mx-8">
              <div className="py-3 text-right ">
                <button
                type="submit"
                className="inline-flex justify-center py-2 text-sm font-medium text-white border border-transparent sm:px-16 bg-dark-blue"
                onClick={props.nextPage}
                >
                Next
                </button>
              </div>
              <div className="py-3 text-left ">
                <button
                type="submit"
                className="inline-flex justify-center py-2 text-sm font-medium bg-white border-1 border-dark-blue text-dark-blue sm:px-16"
                onClick={props.previousPage}
                >
                Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>       
    );

}