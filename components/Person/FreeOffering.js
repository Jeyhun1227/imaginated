import ImageGallery from 'react-image-gallery';
import Link from 'next/link';
import Image from 'next/image';



export default function IndividualFreeOffering({free_offers_array}) {
    
    return (
        <div className="indiv-grid-main-socials">
        {free_offers_array.map((e) => <div className="inline-block indiv-social-media" key={e.type}><Link href={e.link} target="_blank" rel="noopener noreferrer nofollow">
            <div className="flex flex-row space-x-2"><Image src={e.images_name[0]} width={21} height={15} alt={e.images_name[1]}/></div>
        </Link>
        </div>)}
        </div>
    );
}