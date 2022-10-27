import {useState} from "react";

export default function HeroBtn(props) {
    const varLargeTextTop = "Browse Personal Brands " 
    const varLargeTextBottom = "by Category" 
    const varSmallText = "Find, research, or discover a creator to learn from."
    const varBtnText = "Edit your profile"
    const [largeTextTop, setLargeTextTop] = useState(varLargeTextTop);
    const [largeTextBottom, setLargeTextBottom] = useState(varLargeTextBottom);
    const [smallText, setSmallText] = useState(varSmallText);
    const [btnText, setBtnText] = useState(varBtnText);

  return (
    
    <div className="w-full bg-light-grey">
        <div className="px-4 sm:px-0">
            <div className="py-12 mx-auto sm:mx-0 max-w-7xl lg:flex lg:items-center lg:justify-between">
                <div className="text-left">
                    <h1 className="text-4xl font-semibold tracking-tight text-black">
                        <span className="block sm:inline">{props.setLargeTextTop ? props.setLargeTextTop : largeTextTop}</span>{' '}
                        <span className="block text-black sm:inline">{props.setLargeTextBottom ? props.setLargeTextBottom : largeTextBottom}</span>
                    </h1>
                    <p className="mt-3 text-base text-dim-gray sm:mt-5 sm:mx-0">
                        {props.setSmallText ? props.setSmallText : smallText}
                    </p>
                </div>
                <div>
                    <button type="button" onClick={(e) => {e.preventDefault();window.location.href='directory/login';}} className="flex items-center px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue sm:mr-0">
                        <svg className="flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
                            <path fillRule="evenodd" className='fill-white' d="m49.5 4.1c5.7-0.1 9.7 0.5 14 1.9 3.3 1.2 7.8 3.1 10 4.4 2.2 1.3 6.2 4.5 8.8 7.2 2.7 2.7 6 6.9 7.4 9.4 1.5 2.5 3.5 7.2 4.5 10.5 1 3.3 1.8 8.7 1.8 12 0 3.3-0.7 8.7-1.6 12-0.9 3.3-2.8 8.3-4.4 11-1.6 2.7-5 7.2-7.7 9.9-2.6 2.7-6.6 5.9-8.8 7.2-2.2 1.3-6.7 3.2-10 4.4-4 1.4-8.5 2-13.5 2-4.5 0-9.7-0.8-13-1.9-3-1-7.5-3-10-4.4-2.5-1.4-6.7-4.7-9.3-7.4-2.7-2.6-6-6.8-7.4-9.3-1.5-2.5-3.5-7.2-4.5-10.5-1-3.3-1.8-8.7-1.8-12 0-3.3 0.7-8.7 1.6-12 0.8-3.3 2.7-8.2 4.2-10.9 1.5-2.6 5-7 7.7-9.7 2.8-2.7 6.6-5.9 8.5-7.1 1.9-1.2 6.2-3.2 9.5-4.4 4.2-1.5 8.4-2.2 14-2.3zm-11.5 57.6c1.1 1.8 3.6 4 5.5 4.8 1.9 0.8 4.9 1.5 6.5 1.5 1.6 0 4.6-0.7 6.5-1.5 1.9-0.8 4.4-3 5.5-4.8 1.7-2.8 2-5 2-16.4 0-12.6-0.1-13.3-2-13.3-1.9 0-2 0.7-2 11.8 0 9.1-0.4 12.5-1.8 15.2-1.1 2.2-2.8 3.8-4.7 4.4-1.8 0.5-4.4 0.5-6.5 0-2.5-0.7-4-1.9-5.2-4.4-1.4-2.7-1.8-6.1-1.8-15.3 0-11-0.1-11.7-2-11.7-1.9 0-2 0.7-2 13.3 0 11.4 0.3 13.6 2 16.4z"/>
                        </svg>
                        <span className="ml-3">{props.setBtnText ? props.setBtnText : btnText}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    
  )
}