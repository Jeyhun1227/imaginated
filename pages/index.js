import React, { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import axios from 'axios';


export default function MainPageValue(props) {
    useEffect(() => {
        // var parser = new DOMParser();

        // //     // Parse the text
        //     var doc = parser.parseFromString(props.html, "text/html");
      }, [props]);
    return <div dangerouslySetInnerHTML={{ __html: props.html, }}></div>

}

export async function getServerSideProps({query}){
    let getting_data = await axios('https://www.imaginated.com/')
    // console.log(getting_data)
    let html = getting_data.data
    // .then(function(response) {
    //     // When the page is loaded convert it to text
    //     return response.text()
    // })
    // .then(function(html) {
    //     // Initialize the DOM parser
    //     var parser = new DOMParser();

    //     // Parse the text
    //     var doc = parser.parseFromString(html, "text/html");

    //     // You can now even select part of that html as you would in the regular DOM 
    //     // Example:
    //     // var docArticle = doc.querySelector('article').innerHTML;

    //     console.log(doc);
    // })
    // .catch(function(err) {  
    //     console.log('Failed to fetch page: ', err);  
    // });

    return {
      props: {
        html
      }
    }
}