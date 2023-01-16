
import React, { useState, useEffect } from "react";
// import WordCloud from 'react-d3-cloud';
import Link from 'next/link';
import Image from 'next/image'
// import * as d3 from "d3";
// import cloud from "d3-cloud";
import dynamic from "next/dynamic";

const WordCloudMain = dynamic(() =>
import("../components/WordCloud/WordCloud"), {   ssr: false });


export default function IndividualYoutube() {


    // const [wordCloudMain, setWordCloudMain] = useState(() => <div></div>);
    

        // useEffect(() => {
        // setWordCloudMain(() => drawWordCloud())
        // }, [])
            

    

    return <div className="word-cloud-container" >
            {/* <div id='word-cloud'></div> */}
            <WordCloudMain/>
            {/* <WordCloud
                width={150}
                height={250}
                data={newData}
                fontSizeMapper={fontSizeMapper}
                rotate={rotate}
                padding={2}

            /> */}
        </div>
}