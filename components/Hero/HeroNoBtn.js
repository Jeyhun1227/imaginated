import {useState} from "react";

export default function HeroNoBtn() {
    const varLargeTextTop = "Browse Personal Brands " 
    const varLargeTextBottom = "by Category" 
    const varSmallText = "Find, research, or discover a creator to learn from."
    const [largeTextTop, setLargeTextTop] = useState(varLargeTextTop);
    const [largeTextBottom, setLargeTextBottom] = useState(varLargeTextBottom);
    const [smallText, setSmallText] = useState(varSmallText);

  return (
    
    <div className="bg-light-grey">
        <div className="py-12 mx-auto max-w-7xl">
            <div className="text-left">
            <h1 className="text-4xl font-bold tracking-tight text-black">
                <span className="block xl:inline">{largeTextTop}</span>{' '}
                <span className="block text-indigo-600 xl:inline">{largeTextBottom}</span>
            </h1>
            <p className="mt-3 text-base text-dim-gray sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                {smallText}
            </p>
            </div>
        </div>
    </div>
    
  )
}