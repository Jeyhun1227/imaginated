import {useState} from "react";
import Link from 'next/link';

export default function VerticalCallToAction(props) {
    const varLargeTextTop = "Looking for a category but can't" 
    const varLargeTextBottom = "find it? Let us know!" 
    const varBtnText = "Request a Category"
    const varSmallText = "It takes less than 30 seconds"
    const varLink = "/request-category"
    const [largeTextTop, setLargeTextTop] = useState(varLargeTextTop);
    const [largeTextBottom, setLargeTextBottom] = useState(varLargeTextBottom);
    const [btnText, setBtnText] = useState(varBtnText);
    const [smallText, setSmallText] = useState(varSmallText);
    const [link, setLink] = useState(varLink);
  return (
    
    <div className="text-center">
        <div className="text-xl tracking-tight text-dark-blue">
            <span className="block">{props.setLargeTextTop ? props.setLargeTextTop : largeTextTop}</span>{' '}
            <span className="block">{props.setLargeTextBottom ? props.setLargeTextBottom : largeTextBottom}</span>
        </div>
        <div className="mt-4.5 sm:mt-8 sm:flex sm:justify-center">
            <div className="w-full shadow bg-dark-blue">
            <div className="flex items-center justify-center w-full px-8 py-2 text-base font-medium text-white border border-transparent md:py-4 md:text-lg md:px-10">
            <div                 style = {{textDecoration:'none'}}>
            <Link
                href={props.setLink ? props.setLink : link}
                >
                {props.setBtnText ? props.setBtnText : btnText}
            </Link>
            </div>
            </div>
            </div>
        </div>
        <p className="pb-4 mt-2 text-base sm:border-b sm:border-very-light-grey text-dim-grey">{props.setSmallText ? props.setSmallText : smallText}</p>
    </div>
    
  )
}