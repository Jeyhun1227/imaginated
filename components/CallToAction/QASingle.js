import {useState} from "react";
import Link from 'next/link';

export default function QASingle() {
    const varLargeText = "What is Imaginated?" 
    const varLinkText = "Learn more" 
    const varLink = "/directory"
    const varSmallText = "Imaginated is a directory of personal brands. Here you can find the top creators in any given category."
    const [largeText, setLargeText] = useState(varLargeText);
    const [linkText, setLinkText] = useState(varLinkText);
    const [link, setLink] = useState(varLink);
    const [smallText, setSmallText] = useState(varSmallText);
  return (
    
    <div className="text-left">
        <div className="text-xl tracking-tight text-dark-blue">
            <span>{largeText}</span>
        </div>
        <p className="pt-2 mt-2 mb-0 text-base text-dim-grey">{smallText}</p>
        <div>
            <div className="text-base font-medium no-underline justify-left text-denim">
            <Link
                href="#"
                >
                {linkText}
            </Link>
            </div>
        </div>
    </div>
    
  )
}