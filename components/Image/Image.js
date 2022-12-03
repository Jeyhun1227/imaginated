import React, { useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = (props) => {
    const { src, fallbackSrc, className, width, height } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image  src={imgSrc} className={className} width={width} height={height}  onError={() => {
            setImgSrc(fallbackSrc);
        }}/>
    );
};

export default ImageWithFallback;