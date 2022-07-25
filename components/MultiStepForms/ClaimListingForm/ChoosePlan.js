import React, { useEffect, useState } from "react";
import { RadioGroup } from '@headlessui/react'
import { CheckLg, QuestionCircle } from 'react-bootstrap-icons';


export default function ChoosePlan(props) {
  let [plan, setPlan] = useState('Verified')

  return (
    <div className="w-full bg-white ">
      <div className="">
        <div className="max-w-4xl py-12 mx-auto sm:mx-0">
          <div className="pb-6 sm:pb-12">
            <div className="text-center">
                <h1 className="font-bold"> Choose a Plan </h1>
            </div>
            <div className="px-4 pt-8 pb-3 md:px-8 md:rounded-full bg-light-grey">
              <RadioGroup value={plan} onChange={() => props.formDataChangeFromChild('Verified')} className="flex flex-row items-center justify-center w-full space-x-1 md:space-x-4">
                <RadioGroup.Label className="mr-auto text-base font-semibold text-left sm:text-xl md:text-3xl">Membership</RadioGroup.Label>
                <RadioGroup.Option value="Verified">
                  {({ checked }) => (
                    <span className={`cursor-pointer inline-flex justify-center py-1 text-sm font-medium border-1 border-dark-blue rounded-full pl-2 pr-2 md:px-10 ${checked ? 'bg-dark-blue text-white' : ' bg-white text-dark-blue'}`}>
                      Verified
                    </span>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value="business">
                  {({ checked }) => (
                    <span className={`cursor-pointer inline-flex justify-center py-1 text-sm font-medium border-1 border-dark-blue rounded-full pl-2 pr-2 md:px-10 ${checked ? 'bg-dark-blue text-white' : ' bg-white text-dark-blue'}`}>
                      Business
                    </span>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option value="enterprise">
                  {({ checked }) => (
                    <span className={`cursor-pointer inline-flex justify-center py-1 text-sm font-medium border-1 border-dark-blue rounded-full pl-2 pr-2 md:px-10 ${checked ? 'bg-dark-blue text-white' : ' bg-white text-dark-blue'}`}>
                      Enterprise
                    </span>
                  )}
                </RadioGroup.Option>
              </RadioGroup>
              <div className="flex flex-row items-center justify-center w-full space-x-6 md:space-x-24">
                <span className="ml-auto text-sm sm:text-base text-dark-blue ">
                  $0/Mo
                </span>
                <span className="text-sm sm:text-base text-dark-blue">
                  $20/Mo
                </span>
                <span className="pr-2 text-sm sm:text-base md:pr-8 text-dark-blue">
                  $100/Mo
                </span>
              </div>
            </div>
            <div className="flex flex-col px-4 mt-12 space-y-10 md:mx-8 sm:px-0">
              <div className="flex flex-row items-center justify-center w-full pb-2 border-b-2 border-whisper">
                <span className="flex items-center justify-center mr-auto text-base sm:text-lg flex-inline">
                  Manage your profile
                  <QuestionCircle className="ml-2 fill-denim"/>
                </span>
                <div className="flex flex-row space-x-8 md:space-x-28">
                  <span className="pr-3"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                  <span className="pr-4"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                  <span className="pr-8 md:pr-16"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center w-full pb-2 border-b-2 border-whisper">
                <span className="flex items-center justify-center mr-auto text-base sm:text-lg flex-inline">
                  Manage your profile
                  <QuestionCircle className="ml-2 fill-denim"/>
                </span>
                <div className="flex flex-row space-x-8 md:space-x-28">
                  <span className="pr-3"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                  <span className="pr-4"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                  <span className="pr-8 md:pr-16"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center w-full pb-2 border-b-2 border-whisper">
                <span className="flex items-center justify-center mr-auto text-base sm:text-lg flex-inline">
                  Manage your profile
                  <QuestionCircle className="ml-2 fill-denim"/>
                </span>
                <div className="flex flex-row space-x-8 md:space-x-28">
                  <span className="pr-3"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                  <span className="pr-4"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                  <span className="pr-8 md:pr-16"><CheckLg className="w-6 h-6 fill-dark-blue"/></span>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse justify-between px-4 py-12 sm:px-0 md:mx-8">
              <div className="py-3 text-right ">
                <button
                type="submit"
                className="inline-flex justify-center px-8 py-2 text-sm font-medium text-white border border-transparent sm:px-16 bg-dark-blue"
                onClick={props.nextPage}
                >
                Next
                </button>
              </div>
              <div className="py-3 text-left ">
                <button
                type="submit"
                className="inline-flex justify-center px-8 py-2 text-sm font-medium bg-white border-1 border-dark-blue text-dark-blue sm:px-16"
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
