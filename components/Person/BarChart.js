import React, { useState, useEffect, useRef } from "react";
import BarChartSegment from './BarChartSegment';
import hex_colors_list from '../Colors/HexColorSub.json';

const HorizontalStackedBarChart = ({sub_bucket_list, putMainClickedBucket, categoryClicked, getChart}) => {
    const _sum = sub_bucket_list.reduce((accumulator, currentValue) => accumulator + Number(currentValue.count), 0);
    // const hex_colors_list = ["#214499", "#215d99", "#216950", "#217599", "#218150", "#218d98", "#219150", "#219599"]
    return (
      <div className={getChart ? "search-barchart-main" : "Ind-barchart-main"}>
        {sub_bucket_list.map((sub, index) => <BarChartSegment categoryClicked={categoryClicked} key={sub.sub_bucket} width= {Math.floor(sub.count * 1000 / _sum) /10 + '%'} hex_color={hex_colors_list[sub.sub_bucket]} putMainClickedBucket={putMainClickedBucket} category={sub.sub_bucket} count={sub.count}/>
        )}
      </div>
    );
};
export default HorizontalStackedBarChart;