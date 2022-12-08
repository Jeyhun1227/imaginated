import ImageGallery from 'react-image-gallery';
import Link from 'next/link';
import Image from 'next/image';



export default function IndividualFreeOffering({free_offers_array}) {
    
    return <div className="grid grid-cols-2 pt-4 pb-3 mx-0 border-b sm:mx-4 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 border-very-light-grey">
    {free_offers_array.map((e) => <div className="inline-block mr-2 py-.5 px-1 no-underline font-normal sm:text-2xl text-xl text-denim" key={e.type}><Link href={e.link} >
    <a target="_blank" rel="noopener noreferrer nofollow" ><div className="flex flex-row space-x-2"><Image src={e.images_name[0]} width={13} height={15}/> <div className="text-sm text-dim-grey ">{e.images_name[1]}</div></div>
    {e.name.length > 15 ? e.name.slice(0, 15) + '...' : e.name  }</a>
    </Link>
    </div>)}
    </div>
}