import {useState} from "react";

export default function VerticalCallToAction() {
    const varLargeTextTop = "Looking for a category but can't" 
    const varLargeTextBottom = "find it? Let us know!" 
    const varBtnText = "Request a Listing"
    const varSmallText = "It takes less than 30 seconds"
    const [largeTextTop, setLargeTextTop] = useState(varLargeTextTop);
    const [largeTextBottom, setLargeTextBottom] = useState(varLargeTextBottom);
    const [btnText, setBtnText] = useState(varBtnText);
    const [smallText, setSmallText] = useState(varSmallText);
  return (
    
    <div className="text-center">
        <div className="text-xl tracking-tight text-dark-blue">
            <span className="block">{largeTextTop}</span>{' '}
            <span className="block">{largeTextBottom}</span>
        </div>
        <div className="mt-4.5 sm:mt-8 sm:flex sm:justify-center">
            <div className="w-full shadow bg-dark-blue">
            <a
                style = {{textDecoration:'none'}}
                href="#"
                className="flex items-center justify-center w-full px-8 py-2 text-base font-medium text-white border border-transparent md:py-4 md:text-lg md:px-10">
                {btnText}
            </a>
            </div>
        </div>
        <p className="pb-4 mt-2 text-base border-b border-very-light-grey text-dim-grey">{smallText}</p>
    </div>
    
  )
}