import {useState} from "react";

export default function HeroNoBtn() {
    const varLargeTextTop = "Browse Personal Brands " 
    const varLargeTextBottom = "by Category" 
    const varSmallText = "Find, research, or discover a creator to learn from."
    const [largeTextTop, setLargeTextTop] = useState(varLargeTextTop);
    const [largeTextBottom, setLargeTextBottom] = useState(varLargeTextBottom);
    const [smallText, setSmallText] = useState(varSmallText);

  return (
    
    <div className="sm:px-10 bg-light-grey">
        <div className="px-4 py-12 mx-auto sm:px-0 max-w-7xl">
            <div className="text-left">
            <h1 className="text-4xl font-bold tracking-tight text-black">
                <span className="block sm:inline">{largeTextTop}</span>{' '}
                <span className="block text-black sm:inline">{largeTextBottom}</span>
            </h1>
            <p className="mt-3 text-base text-dim-gray sm:mt-5 sm:max-w-xl sm:mx-0">
                {smallText}
            </p>
            </div>
        </div>
    </div>
    
  )
}