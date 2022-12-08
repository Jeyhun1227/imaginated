import React, { useEffect, useState } from "react";
import {Rating} from '@mui/material';
import Link from 'next/link';
import ImageWithFallback from '../Image/Image'

export default function CategoryPageSub(props) {
    const [CatValues, setCatValues] = useState([]);

    useEffect(() => {
        setCatValues(props.values)
    }, [props]);

  return  <div className="mb-12">
        <div className="relative flex items-baseline justify-between pb-3 border-b border-very-light-grey">
            <div className="text-xl font-medium tracking-tight no-underline sm:text-2xl text-denim"><Link href={props.category + '/Learn-' + props.subcategory.replace(' ', '-')}>{props.subcategory}</Link></div>
        </div>
        <div className="py-6 border-b border-very-light-grey">
            <div className="grid grid-custom-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {CatValues.map((e) => <div className="flex flex-row items-center flex-shrink-0 truncate" key={e.linkname}>
                    <div className="flex-shrink-0 pr-2.5 overflow-hidden">
                        <ImageWithFallback src={e.imagelink} className={"w-8 h-8 rounded-full sm:w-10 sm:h-10"} width={40} height={40} fallbackSrc={"/fallbackimage.svg"}  />
                    </div>
                    <div className="">
                        <div className="flex flex-row space-x-0.5 sm:space-x-1 flex-wrap"> 
                            <div onClick={() => window.location.href = '/directory/person/' + e.linkname}  ><><div className="mb-0 text-small no-underline truncate sm:text-base md:text-lg text-denim cursor-point">{e.first_name + ' ' + e.last_name}</div></></div>
                            {(e.aka && e.aka !== '')?<div className="inline-flex items-center justify-center"> 
                                <span className="text-[9px] sm:text-sm text-ellipsis text-dim-grey">({e.aka})</span>
                            </div> :null}
                        </div>
                        <div className="flex space-x-0.5 sm:space-x-1.5 items-center sm:flex-row sm:flex-wrap">
                            <Rating name={e.first_name + e.last_name} value={parseFloat(e.avg)} precision={0.5} size="small" sx={{
                                    color: "yellow",
                                    borderRadius: '10px',
                                    '& .MuiSvgIcon-root': {
                                        fill: '#F8DC81',
                                    },
                                    '& .css-dqr9h-MuiRating-label': {
                                    display: 'block'
                                    }                        
                                    }} readOnly/>
                            <div className={`{styles.inline_block} text-denim sm:text-sm text-xs`}>{e.avg}</div>
                            <div className={`{styles.inline_block} text-denim sm:text-sm text-xs`}>({e.count})</div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    </div>

}