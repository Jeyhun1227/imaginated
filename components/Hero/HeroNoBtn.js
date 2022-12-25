import {useState} from "react";

export default function HeroNoBtn(props) {
    const varLargeTextTop = "Browse Educators " 
    const varLargeTextBottom = "by Category" 
    const varSmallText = "Find, research, or discover a creator to learn from."
    const [largeTextTop, setLargeTextTop] = useState(varLargeTextTop);
    const [largeTextBottom, setLargeTextBottom] = useState(varLargeTextBottom);
    const [smallText, setSmallText] = useState(varSmallText);

  return (
    
    <div className="w-full bg-light-grey">
        <div className="px-4 sm:px-0">
            <div className="py-12 mx-auto sm:mx-0 max-w-7xl">
                <div className="text-left">
                    <h1 className="text-4xl font-bold tracking-tight text-black">
                        <span className="block sm:inline">{props.setLargeTextTop ? props.setLargeTextTop : largeTextTop}</span>{' '}
                        <span className="block text-black sm:inline">{props.setLargeTextBottom ? props.setLargeTextBottom : largeTextBottom}</span>
                    </h1>
                    <p className="mt-3 text-base text-dim-gray sm:mt-5 sm:mx-0">
                        {props.setSmallText ? props.setSmallText : smallText}
                    </p>
                </div>
            </div>
        </div>
    </div>
    
  )
}