import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageWithFallback = (props) => {
    const { src, fallbackSrc, className, width, height, alt } = props;
    const [imgSrc, setImgSrc] = useState(src);
    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return (
        <Image  alt={alt ? alt : 'Imaginated Image'} src={imgSrc} className={className} width={width} height={height}  onError={() => {
            setImgSrc(fallbackSrc);
        }}/>
    );
};

export default ImageWithFallback;