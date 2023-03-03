import ImageWithFallback from '../Image/Image'
import {Rating} from '@mui/material';
import React, { useEffect, useState } from "react";
import Link from 'next/link'


export default function IndividualSidebar({category_values, mobile}) {
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
      const [windowDimensions, setWindowDimensions] = useState({});
      const [category_values_filtered, setCategory_values_filtered] = useState(category_values);

    
      useEffect(() => {
        function handleResize() {
            let dimension_values = getWindowDimensions()
            if(dimension_values.width > 850){
                setCategory_values_filtered(category_values)
            }else{
                setCategory_values_filtered(category_values.slice(0, 2))
            }

            setWindowDimensions(dimension_values);
        }
        handleResize();    
        window.addEventListener('resize', handleResize);
        () => window.removeEventListener('resize', handleResize);
      }, [])

    return <div>
                <div className="">
                    <div className="text-2xl tracking-tight text-dark-blue padding-top-bottom-10" >Related Creators</div>
                    <div className={(windowDimensions.width <= 850)? "grid-layout-3": ""}>
                    {category_values_filtered.map((e) => <div className={mobile ? "inline-block": "padding-top-bottom-20"} key={e.linkname}>
                        <div>
                            <div className={`flex-shrink-0 pr-2.5 overflow-hidden inline-block`}>
                                <ImageWithFallback src={e.imagelink} className={"w-8 h-8 rounded-full sm:w-10 sm:h-10"} width={40} height={40} fallbackSrc={"/fallbackimage.svg"}  />
                            </div>
                            <div className="inline-block">
                                <div className="flex flex-row space-x-0.5 sm:space-x-1 flex-wrap"> 
                                    <div className="mb-0 text-small no-underline truncate sm:text-base md:text-lg text-denim cursor-point sidebar-related-creators"><Link href={'/directory/person/' + e.linkname}  ><div>{e.first_name + ' ' + e.last_name}</div></Link></div>
                                    {(e.aka && e.aka !== '')?<div className="inline-flex items-center justify-center"> 
                                        <span className="text-[9px] sm:text-sm text-ellipsis text-dim-grey">({e.aka})</span>
                                    </div> :null}
                                </div>
                                <div className="inline-flex items-center justify-center space-x-2 padding-right-5 font-weight-500 font-size-14">Educator Rating: </div>
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
                        </div>
                        <div className="pt-2 text-dim-grey">
                            {e.description.length > 150 ? e.description.slice(0, 150) + '...': e.description}
                            <div className="no-underline text-denim cursor-point">
                            <Link  href={() => window.location.href = '/directory/person/' + e.linkname}>
                                <div >Learn more about {e.first_name} {e.last_name}</div>
                            </Link>
                            </div>
                        </div>
                    </div>)}
                    </div>
                </div>
        </div>

  }


