import React, { useState, useEffect, useRef } from "react";



const BarChartSegment = ({width, hex_color, category, count, categoryClicked, putMainClickedBucket}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false)
    const handleMouseEnter = () => {
      setIsHovering(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const clicked = () => {
        if(categoryClicked === category) return setIsClicked(false);
        setIsClicked(!isClicked)
        putMainClickedBucket(category)
    }

    useEffect(()=> { setIsClicked(categoryClicked === category)
    }, [categoryClicked])
    

    return (
        <div className={`h-full inline-block position-relative`}
        style={{width: width, backgroundColor: hex_color}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={clicked}
        >
            {isHovering && (
                <div className="indiv-barchart-popup text-dim-grey">
                <span>{category}</span>
                {/* <span><b>Count:</b> {count}</span> */}
                </div>
            )}
            <div className={`each-sub-bucket-chart${isClicked ? '-clicked':''}`} style={{backgroundColor: hex_color}} />
            
            
        </div>
    );
};
export default BarChartSegment;