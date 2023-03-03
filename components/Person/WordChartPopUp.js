
import React, { useState, useEffect } from "react";
import { CSSTransition } from 'react-transition-group';
import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios'
import {PlayFill} from 'react-bootstrap-icons';
import ImageWithFallback from '../Image/Image';
import OutsideClickHandler from 'react-outside-click-handler';
import { useRouter } from 'next/router';

export default function WordChartPopUp({query, initialRunVideoid, initialRunVideoidFunc, individual, nullQuery, getCurrentList, getCurrentVideo}) {

    const [youtubeKeywordsVal, setYoutubeKeywordsVal] = useState([]);
    const [initialRun, setInitialRun] = useState(false);


    const turnArrayIntoNestedArrayOf2 = (arr) => {
        const result = [];
        let temp = [];
        arr.map((obj, i) => {
          temp.push(obj);
          if (temp.length >= 2) {
            result.push(temp);
            temp = [];
          }
        });
        if(temp.length > 0) result.push(temp)

        return result;
    }

    const getWordIndividual = async () => {
        let youtubeKeywords = await axios.post(`${window.location.origin}/api/WordCloud/search/`, {query: query.value, individual, query_param: query.param})
        // console.log('setYoutubeKeywordsVal: ', youtubeKeywords.data.indivudal_val)
        
        let youtube_val = turnArrayIntoNestedArrayOf2(youtubeKeywords.data.indivudal_val)
        setYoutubeKeywordsVal(youtube_val)
        getCurrentList(youtubeKeywords.data.indivudal_val)
        if(!initialRun) setInitialRun(true)
    }

    const router = useRouter();
    const {videoid} = router.query;

    useEffect(() => {
      if(query){
        getWordIndividual();
      }

    }, [query])

    useEffect(() => {
        if(initialRun && videoid && !initialRunVideoid){
            // setInitialRun(false)
            console.log('initialRun, videoid: ', initialRun, videoid)
            getCurrentVideo(videoid);
            initialRunVideoidFunc()
        }
  
      }, [videoid, initialRun])



    return <CSSTransition
    in={true}
    timeout={300}
    classNames="popup-word-cloud"
    unmountOnExit
    >
    <OutsideClickHandler onOutsideClick={()=> nullQuery()}>
    <div className="popup-word-cloud">
    <button onClick={() => nullQuery()} className="exit-top-right">X</button>
    <Carousel  variant="dark" pause='hover' className='min-height-300'>
        
    {youtubeKeywordsVal.map((keywordsVal, i) => 
        <Carousel.Item key={i}>
            <div className='popup-carousel-container'>
            <div className='grid-layout-2-1'>
            {keywordsVal.map((e) => 
                <div key={e.id} className="py-2 cursor-point" onClick={()=>getCurrentVideo(e.videoid)} >
                        <div >
                            <div className="position-relative width-355-0">
                            <PlayFill className="fa-9x position-absolute z-index-5 play-button fill-dark-red" size={50}/>
                            <ImageWithFallback src={e.thumbnail.replace('default.jpg', 'mqdefault.jpg')} width={355} height={200} fallbackSrc={"/fallbackimage.svg"}/>
                            </div>
                            <div className="text-small no-underline sm:text-base md:text-lg text-denim">{e.title}</div>
                        </div>
                </div>)}
                </div>
            </div>
        </Carousel.Item>)}
    </Carousel>
    
    </div>
    </OutsideClickHandler>
    </CSSTransition>
}
