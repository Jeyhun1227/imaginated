import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';


export default function SettingsFollowing(props) {
    const [showMore, setShowMore] = useState(false);
    const [userFollow, setUserFollow] = useState([]);
    useEffect(async () => {
        setUserFollow(props.userFollow.slice(0, 10))
        setShowMore(props.userFollow.length <= 10)
      }, [props]);
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const showMoreFunc = () => {
        setUserFollow(props.userFollow)
        setShowMore(true)
    }

    const userUnfollow = async (individualid) => {
        let UserIndividual = await axios.post(`${window.location.origin}/api/User/SetFollower`, {IndividualId: individualid, addIndividual: false})
        let user = userFollow.filter((e) => e.individualid !== individualid)
        setUserFollow(user)
    }

    return (
        <div className="border border-whisper lg:h-full">
            <div className="p-3">
                <div className="flex flex-col">
                    <h4>Following list</h4>
                    <div className="mt-1">
                        <div className="flow-root">
                            <ul className="pl-0 divide-y divide-whisper">
                                {userFollow.map((e) => 
                                <li className="flex py-3" key={e.individualid}>
                                    <div className="flex-shrink-0 w-8 h-8 overflow-hidden border rounded-full sm:w-10 sm:h-10 border-whisper">
                                        <img src={e.imagelink} className="object-cover object-center w-full h-full"/>
                                    </div>
                                    <div className="flex items-center justify-between w-full ml-4">
                                        <div className="flex flex-col flex-1">
                                            <h5> <a href={`${window.location.origin}/category/person/${e.link}`} target="_blank" >{e.name}</a></h5>
                                            <div className="flex items-end justify-between flex-1 text-sm">
                                                {e.aka ?<p className="mb-0 text-dim-grey ">A.K.A {e.aka}</p>: null}
                                            </div>
                                        </div>
                                        <div className="">
                                            <button onClick={() => userUnfollow(e.individualid)} className="hover:bg-dark-blue hover:text-white items-center justify-center px-4 py-1.5 text-center text-green-vogue cursor-pointer border-2 border-green-vogue">
                                                Unfollow
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                )}
                            </ul>
                        </div>
                        <div className="text-left">
                            {(!showMore)? <button className="px-3 py-2 mr-3 text-center text-white truncate bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 sm:mr-0" onClick={showMoreFunc}>Load more</button>: null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
