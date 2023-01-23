
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import WordChartPopUp from './WordChartPopUp'
import IndividualYoutube from './Youtube'
import { useRouter } from 'next/router';


export default function WordChart({wordChartIndividual, width, individual, Youtube_free_content, Youtube_free_offers, Youtube_name, Youtube_link}) {
    const hex_colors = {
    100: "#214499",
    1000: "#215151",
    1100: "#215599",
    21000: "#215950",
    41000: "#215d99",
    61000: "#216150",
    81000: "#216599",
    101000: "#216950",
    130000: "#216d99",
    180000: "#217151",
    250000: "#217599",
    300000: "#217950",
    350000: "#217d99",
    500000: "#218150",
    700000: "#218598",
    900000: "#218950",
    1000000: "#218d98",
    1200000: "#219150",
    1500000: "#219599",
    }
    function getColor(view){
        let view_found = Object.keys(hex_colors).find((e) => e > view)
        if(view_found) return hex_colors[view_found]
        return "#21b950"
    }
    function normalizeList(arr, range) {
        let scores = arr.map(el => el.score);
        let minScore = Math.min(...scores);
        let maxScore = Math.max(...scores);

        return arr.map(v => ({...v, score: 10 + ((v.score - minScore) / (maxScore - minScore)) * range}));
    }
    const setDistribution = (arr) => {
        const min = 10;
        const max = 50;
        const range = max - min;
        const arr_normalized = arr.map(v => ({...v, score: v.score > 1.3 ? 1.3 : v.score}));
        const result = normalizeList(arr_normalized, range)
        // result.map((e) => console.log(e, e.score * factor, ))
        console.log('factor: ', result)
        return result;
    }
    const drawWordCloud = () => {
        const fontSizeMapper = word => word.value * 20;
        const rotate = word => 0;
        const height = 300;
        
        const data = setDistribution(wordChartIndividual).map(item => ({
            text: item.keyword,
            size: item.score,
            view: item.view
          }));
        // console.log('data: ', data)
      var svg_remove = d3.select("#word-cloud");
      svg_remove.selectAll("*").remove();

      const fontFamily = "Verdana, Arial, Helvetica, sans-serif";

      const svg = d3.select("#word-cloud")
        .append("svg")
        .attr("id", "word-cloud")
        .attr("viewBox", [0, 0, width, height])
        .attr("font-family", fontFamily)
        .attr("text-anchor", "middle");
    
        const handleClick = (d, i) => {
    
        setQueryMain(d.target.textContent)
        //   displaySelection.text(`selection="${e.text()}"`);
        //   e.classed("word-selected", !e.classed("word-selected"));
        }

      const cloudVal = cloud()
        .size([width, height])
        .words(data)
        .padding(1)
        .rotate(() => 0)
        .font(fontFamily)
        .fontSize(d => d.size)
        .on("word", ({size, x, y, rotate, text, view}) => {
            // console.log('size: ', text, size, view)
          svg.append("text")
            .style("fill", getColor(view))
            .attr("font-size", size)
            .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
            .text(text)
            .classed("click-only-text", true)
            .classed("word-default", true)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("click", handleClick);
          
            function handleMouseOver(d, i) {
              d3.select(this)
                .classed("word-hovered", true)
                .transition(`mouseover-${text}`).duration(300).ease(d3.easeLinear)
                  .attr("font-size", size + 2)
                  .attr("font-weight", "bold");
            }
            
            function handleMouseOut(d, i) {
              d3.select(this)
                .classed("word-hovered", false)
                .interrupt(`mouseover-${text}`)
                  .attr("font-size", size);
            }
            

    
        });
      
        cloudVal.start();
    //   invalidation.then(() => cloud.stop());
      };
    useEffect(() => {
        if(width && wordChartIndividual.length > 0) drawWordCloud()
    }, [wordChartIndividual, width])
    const router = useRouter();

    const {query} = router.query;
    useEffect(() => {
      if(query) setQueryMain(query)
  }, [query])

    const [initialRunVideoid, setInitialRunVideoid] = useState(false);
    const [queryMain, setQueryMain] = useState();
    const nullQuery = () => setQueryMain();
    const getCurrentList = (free_content_val) => {
        free_content_val = free_content_val.map((e) => ({...e, embedUrl: `https://www.youtube.com/embed/${e.videoid}?autoplay=0&showinfo=0`}))
        setContent(free_content_val)
    }

    const getCurrentVideo = (id) => {
        // console.log('getCurrentVideo: ', id, content)
        let pickedVideo = content.find((e) => e.videoid === id);
        let otherVideos = content.filter((e) => e.videoid != id)
        let currentVals = [pickedVideo].concat(otherVideos)
        setContent(currentVals)
        setScroll_down(id)
    }
    const [content, setContent] = useState(Youtube_free_content);
    const [scroll_down, setScroll_down] = useState();
    const scrollYoutube = (id)=>{
        setScroll_down(id)
    }
    const initialRunVideoidFunc = () => setInitialRunVideoid(true)



    return <div className="position-relative word-cloud-container" >
            {(queryMain) ? <WordChartPopUp initialRunVideoidFunc={initialRunVideoidFunc} initialRunVideoid={initialRunVideoid} scrollYoutube={scrollYoutube} individual={individual} query={queryMain} nullQuery={nullQuery} getCurrentList={getCurrentList} getCurrentVideo={getCurrentVideo}/>:null}
            <div id='word-cloud' className="py-4"></div>

            {(Youtube_free_offers.youtube && content.length > 0) ? <IndividualYoutube free_content={content.slice(0,3)} link={Youtube_link} name={Youtube_name} scroll_down={scroll_down}/>: null}
        </div>
}