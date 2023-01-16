
import React, { useState, useEffect } from "react";
import WordCloud from 'react-d3-cloud';
import Link from 'next/link';
import Image from 'next/image'
import * as d3 from "d3";
import cloud from "d3-cloud";



export default function IndividualYoutube({wordChartIndividual}) {


    const [wordCloudMain, setWordCloudMain] = useState(() => <div></div>);
    const drawWordCloud = () => {
        const fontSizeMapper = word => word.value * 20;
        const rotate = word => 0;
        let data = [
            {
              "text": "goeiedag",
              "value": 10
            },
            {
              "text": "mir\u00eb dita",
              "value": 15
            },
            {
              "text": "gu\u00e0tertag",
              "value": 12
            },
        ]
        const newData = wordChartIndividual.map(item => ({
            text: item.keyword,
            value: item.score
          }));
        return <WordCloud
        width={150}
        height={250}
        data={newData}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
        padding={2}
        // onWordMouseOver={onWordMouseOver}
        // onWordMouseOut={onWordMouseOut}
      />
        //     const words = [
    //       {
    //         text: 'portrait photography',
    //         value: 15
    //       },
    //       {
    //         text: 'portrait photographers',
    //         value: 100
    //       }
    //     ];
    //     var data = d3
    //     .rollups(
    //     words,
    //     (group) => group.length,
    //     (w) => w
    //     )
    //     // console.log('data val: ', data)
    //     // .sort(([, a], [, b]) => d3.descending(a, b))
    //     // .slice(0, 250)
    //     // .map(([text, value]) => ({text, value}));
    //     .map(([text, value]) => ({text: text.text, value: text.value }));
  
    //     const width = 200;
    //     const height = 200;
    //     var fontFamily = "sans-serif";
    //     var fontScale = 15;
    //     var padding = 0;
    //     const rotate = () => 0; // () => (~~(Math.random() * 6) - 3) * 30

      
    //     const svg = d3
    //     .select("#word-cloud")
    //     .append("svg")
    //     .attr("height", height)
    //     .attr("width", width)
    //     .attr("font-family", fontFamily)
    //     .attr("text-anchor", "middle");
    
    //   const w_cloud = cloud()
    //     .size([width, height])
    //     .words(data)
    //     .padding(padding)
    //     .rotate(rotate)
    //     .font(fontFamily)
    //     .fontSize((d) => Math.sqrt(d.value) * fontScale)
    //     .on("word", ({ size, x, y, rotate, text }) => {
    //       svg
    //         .append("text")
    //         .attr("font-size", size)
    //         .attr("transform", `translate(${x},${y}) rotate(${rotate})`)
    //         .text(text);
    //     });
    
    //   w_cloud.start();
      };
    useEffect(() => {
        setWordCloudMain(() => drawWordCloud())
        
            
    }, [wordChartIndividual])
    

    return <div className="position-relative word-cloud-container" >
            <div id='word-cloud'></div>
            {wordCloudMain}
        </div>
}