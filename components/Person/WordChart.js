
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import WordChartPopUp from './WordChartPopUp'
import IndividualYoutube from './Youtube'
import { useRouter } from 'next/router';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageWithFallback from '../Image/Image';
import {PlayFill} from 'react-bootstrap-icons';
import axios from 'axios';
import HorizontalStackedBarChart from './BarChart';
import YoutubePlayButton from '../../public/youtube-play-button.svg';
import hex_colors_list from '../Colors/HexColorSub.json';
import client from '../../components/GraphQL';
import {SEARCH_INDIVIDUAL_QUERY} from '../../GraphQL/Queries/SearchQuery';


export default function WordChart({wordChartIndividual, width, individual, Youtube_free_content, Youtube_free_offers, Youtube_name, Youtube_link}) {
    const hex_colors = { 100: "#214499", 1000: "#215151", 1100: "#215599", 21000: "#215950", 41000: "#215d99", 61000: "#216150", 81000: "#216599",
    101000: "#216950", 130000: "#216d99", 180000: "#217151", 250000: "#217599", 300000: "#217950", 350000: "#217d99", 500000: "#218150",
    700000: "#218598", 900000: "#218950", 1000000: "#218d98",1200000: "#219150", 1500000: "#219599",
    }
    // const hex_colors_list = ["#214499", "#215d99", "#216950", "#217599", "#218150", "#218d98", "#219150", "#219599"]

    // function getColor(view){
    //     let view_found = Object.keys(hex_colors).find((e) => e > view)
    //     if(view_found) return hex_colors[view_found]
    //     return "#21b950"
    // }
    // function normalizeList(arr, range) {
    //     let scores = arr.map(el => el.score);
    //     let minScore = Math.min(...scores);
    //     let maxScore = Math.max(...scores);

    //     return arr.map(v => ({...v, score: 10 + ((v.score - minScore) / (maxScore - minScore)) * range}));
    // }
    // const setDistribution = (arr) => {
    //     const min = 10;
    //     const max = 50;
    //     const range = max - min;
    //     const arr_normalized = arr.map(v => ({...v, score: v.score > 1.3 ? 1.3 : v.score}));
    //     const result = normalizeList(arr_normalized, range)
    //     // result.map((e) => console.log(e, e.score * factor, ))
    //     // console.log('factor: ', result)
    //     return result;
    // }
    // const drawWordCloud = () => {
    //     const fontSizeMapper = word => word.value * 20;
    //     const rotate = word => 0;
    //     const height = 300;
        
    //     const data = setDistribution(wordChartIndividual).map(item => ({
    //         text: item.keyword,
    //         size: item.score,
    //         view: item.view
    //       }));
    //     // console.log('data: ', data)
    //   var svg_remove = d3.select("#word-cloud");
    //   svg_remove.selectAll("*").remove();

    //   const fontFamily = "Verdana, Arial, Helvetica, sans-serif";

    //   const svg = d3.select("#word-cloud")
    //     .append("svg")
    //     .attr("id", "word-cloud")
    //     .attr("viewBox", [0, 0, width, height])
    //     .attr("font-family", fontFamily)
    //     .attr("text-anchor", "middle");
    
    //     const handleClick = (d, i) => {
    
    //     setQueryMain({value: d.target.textContent, param: false})
    //     //   displaySelection.text(`selection="${e.text()}"`);
    //     //   e.classed("word-selected", !e.classed("word-selected"));
    //     }

    //   const cloudVal = cloud()
    //     .size([width, height])
    //     .words(data)
    //     .padding(1)
    //     .rotate(() => 0)
    //     .font(fontFamily)
    //     .fontSize(d => d.size)
    //     .on("word", ({size, x, y, rotate, text, view}) => {
    //         // console.log('size: ', text, size, view)
    //       svg.append("text")
    //         .style("fill", getColor(view))
    //         .attr("font-size", size)
    //         .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
    //         .text(text)
    //         .classed("click-only-text", true)
    //         .classed("word-default", true)
    //         .on("mouseover", handleMouseOver)
    //         .on("mouseout", handleMouseOut)
    //         .on("click", handleClick);
          
    //         function handleMouseOver(d, i) {
    //           d3.select(this)
    //             .classed("word-hovered", true)
    //             .transition(`mouseover-${text}`).duration(300).ease(d3.easeLinear)
    //               .attr("font-size", size + 2)
    //               .attr("font-weight", "bold");
    //         }
            
    //         function handleMouseOut(d, i) {
    //           d3.select(this)
    //             .classed("word-hovered", false)
    //             .interrupt(`mouseover-${text}`)
    //               .attr("font-size", size);
    //         }
            

    
    //     });
      
    //     cloudVal.start();
    // //   invalidation.then(() => cloud.stop());
    //   };
    

    useEffect(() => {
        // if(width && wordChartIndividual.length > 0) drawWordCloud()
        if(wordChartIndividual.length > 0) setSub_bucket_list(wordChartIndividual)
    }, [wordChartIndividual])
    const router = useRouter();

    const getMainCategory = async (sub_bucket) => {
      setCategoryClicked(sub_bucket)

      setTimeout(() => scrollToRef(sub_bucket), 400);

    }
    const getVideoId = async (video_selected, message) => {
      console.log(message);
      if(!video_selected) return;
      setShowVideoId(video_selected)


    }
    const getMainQuery = async (query, videoid) => {
      console.log('getMainQuery: ', query)
      let main_list = await getWordIndividual({value: query, param: true, videoid})
      if(main_list.length === 0) return getVideoId(null,'failed to find a match');
      let {parent, sub_bucket} = main_list[0];
      let getting_sub_bucket = sub_bucket_list.find((e) => e.sub_bucket === sub_bucket);
      if(!getting_sub_bucket) return getVideoId(main_list[0],'failed to find a sub_bucket');
      let parent_value = getting_sub_bucket.parents.find((e) => e.parent === parent)
      if(!parent_value) return getVideoId(main_list[0], 'failed to find parent')
      let parent_val_list = Object.keys(parent_value.values).map((e) => parent_value.values[e])
      if(!parent_value.values[videoid] ) return getVideoId(main_list[0],'failed to find a parent');

      setWordIndividualFound(parent_val_list)

      setCategoryClicked(sub_bucket)

      setExpendedValue(parent.toLowerCase())
      if(videoid){
        setShowVideoId(parent_value.values[videoid])
      }
      setTimeout(() => scrollToRef(sub_bucket), 400);

    }
    const {query, videoid, category} = router.query;
    const [sub_bucket_list, setSub_bucket_list] = useState([]);


    useEffect(() => {
      if(query && sub_bucket_list.length > 0){ 
        getMainQuery(query, videoid)
      }
    }, [query, videoid, sub_bucket_list])

    useEffect(() => {
      if(category) getMainCategory(category);
    }, [category])

    const [initialRunVideoid, setInitialRunVideoid] = useState(false);

    const [queryMain, setQueryMain] = useState();
    const nullQuery = () => setQueryMain();
    const getCurrentList = (free_content_val) => {
        free_content_val = free_content_val.map((e) => ({...e, embedUrl: `https://www.youtube.com/embed/${e.videoid}?autoplay=0&showinfo=0`}))
        // setContent(free_content_val)
        return free_content_val
    }
    const getWordIndividual = async (query) => {
      let youtubeKeywords = await client.query({query:SEARCH_INDIVIDUAL_QUERY, variables: {query: query.value, videoid: query.videoid, individual, query_param: query.param}})
      youtubeKeywords = youtubeKeywords.data.queryIndividualSearch
      // let youtubeKeywords = await axios.post(`${window.location.origin}/api/WordCloud/search/`, {query: query.value, videoid: query.videoid, individual, query_param: query.param})
      // console.log('youtubeKeywords: ', youtubeKeywords)
      // let youtube_val = turnArrayIntoNestedArrayOf2(youtubeKeywords.data.indivudal_val)
      // setYoutubeKeywordsVal(youtube_val)
      // console.log('youtubeKeywords: ', youtubeKeywords)
      let currentList =  getCurrentList(youtubeKeywords.individualVal)
      // console.log('currentList: ', currentList)
      return currentList
      // if(!initialRun) setInitialRun(true)
  }

  const getChildrenKeywords = async (parent, expanded) => {
    if(!expanded) return setExpendedValue()
    if(parent.parent === ExpendedValue) return setExpendedValue()
    // console.log('parent: ', parent)
    // const wordIndividual = await getWordIndividual({value: parent, param: false})

    // console.log('wordIndividual: ', Object.keys(parent.values).map((e) => parent.values[e]))
    setWordIndividualFound(Object.keys(parent.values).map((e) => parent.values[e]))
    setExpendedValue(parent.parent.toLowerCase())


  }

  const [ExpendedValue, setExpendedValue] = useState()
  const [showVideoId, setShowVideoId] = useState()
  const [WordIndividualFound, setWordIndividualFound] = useState([])
  const [categoryClicked, setCategoryClicked] = useState()

  const AccordionList = useRef(null);
  const scrollToRef = (category) => {
    const element = document.getElementById(category);
    if(element) element.scrollIntoView({ behavior: 'smooth' });

  }

    // const getCurrentVideo = (id) => {
    //     // console.log('getCurrentVideo: ', id, content)
    //     let pickedVideo = content.find((e) => e.videoid === id);
    //     let otherVideos = content.filter((e) => e.videoid != id)
    //     let currentVals = [pickedVideo].concat(otherVideos)
    //     setContent(currentVals)
    //     setScroll_down(id)
    // }
    const [content, setContent] = useState(Youtube_free_content);
    const [scroll_down, setScroll_down] = useState();
    const scrollYoutube = (id)=>{
        setScroll_down(id)
    }
    const initialRunVideoidFunc = () => setInitialRunVideoid(true)

    const showVideoIdChange = (videoId) => {
      document.body.style.overflow = "";
      setShowVideoId(videoId)
    }
    
    const putMainClickedBucket = async (category) => {
      if(category === categoryClicked) return setCategoryClicked(null)
      setCategoryClicked(category)
      
      setTimeout(() => scrollToRef(category), 400);
    }


    return <div className="position-relative word-cloud-container" >
            {/* {(queryMain) ? <WordChartPopUp initialRunVideoidFunc={initialRunVideoidFunc} initialRunVideoid={initialRunVideoid} scrollYoutube={scrollYoutube} individual={individual} query={queryMain} nullQuery={nullQuery} getCurrentList={getCurrentList} getCurrentVideo={getCurrentVideo}/>:null} */}
            <HorizontalStackedBarChart categoryClicked={categoryClicked} putMainClickedBucket={putMainClickedBucket} sub_bucket_list={sub_bucket_list.slice(0,5)}/>
            {/* <div id='word-cloud' className="py-4"></div> */}
            <div className='position-relative' ref={AccordionList}>
            {sub_bucket_list.slice(0,15).map((each_bucket, index) => <div key={each_bucket.sub_bucket} id={each_bucket.sub_bucket}>
              <Accordion TransitionProps={{ unmountOnExit: true }} expanded={each_bucket.sub_bucket === categoryClicked} onChange={() => putMainClickedBucket(each_bucket.sub_bucket)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className="accordion-circle" style={{backgroundColor: index > 4 ? 'rgba(0, 0, 0, 0.1)': hex_colors_list[each_bucket.sub_bucket]}}></div>
                  <div>
                  <div>{each_bucket.sub_bucket}</div>
                  <div>
                  <div className='inline-block font-size-14 text-dim-grey margin-right-10'>{each_bucket.avg}%</div>
                  <div className='inline-block font-size-14 text-dim-grey'>{each_bucket.count} videos</div>
                  </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  {each_bucket.parents.slice(0,15).map((each_parent) =>    
                    <Accordion key={each_parent.parent} id={each_parent.parent}  TransitionProps={{ unmountOnExit: true }} expanded={each_parent.parent.toLowerCase() === ExpendedValue} onChange = {(e,expanded) => getChildrenKeywords(each_parent, expanded)}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"

                      >  
                      <div>
                        <div>{each_parent.parent}</div>
                        <div>
                          <div className='inline-block font-size-14 text-dim-grey'>{each_parent.count} videos</div>
                        </div>
                      </div>
                      </AccordionSummary>
                        <AccordionDetails>
                        <div className='popup-carousel-container'>
                          <div className='grid-layout-2-1'>
                          {each_parent.parent.toLowerCase() === ExpendedValue ? WordIndividualFound.slice(0,6).map((each_list) =>  <div key={each_list.embedUrl}>
                                  <div  className="py-2 cursor-point" onClick={() => setShowVideoId({...each_list, embedUrl: each_list.embedUrl.replace('autoplay=0', 'autoplay=1&mute=0')})} >
                                          <div >
                                              <div className="position-relative width-355-0">
                                              {/* <PlayFill className="fa-9x position-absolute z-index-5 play-button fill-dark-red" size={50}/> */}
                                              <ImageWithFallback src={YoutubePlayButton} width={53} height={42} alt={'youtube play button'} className='fa-9x position-absolute z-index-5 play-button' />
                                              
                                              <ImageWithFallback src={each_list.thumbnail.replace('default.jpg', 'mqdefault.jpg')} width={355} height={200} fallbackSrc={"/fallbackimage.svg"}/>
                                              </div>
                                              <div className="text-small no-underline sm:text-base md:text-lg text-denim indiv-youtube-video-each">{each_list.title}</div>
                                          </div>
                                  </div>
                          </div>): null}
                          </div>
                        </div>
                        </AccordionDetails>
                    </Accordion>
                  )}

                </AccordionDetails>
              </Accordion>
            </div>)}
            </div>
            <IndividualYoutube showVideoId={showVideoId} showVideoIdChange={showVideoIdChange} WordIndividualFound={WordIndividualFound} link={Youtube_link} name={Youtube_name} scroll_down={scroll_down}/>
        </div>
}