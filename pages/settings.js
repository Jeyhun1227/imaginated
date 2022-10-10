import { signIn, signOut, useSession } from "next-auth/react";
import HeroNoBtn from "../components/Hero/HeroNoBtn";
import SettingsPage from "../components/Protected/Settings/SettingsPage";
import SettingsPageMobile from "../components/Protected/Settings/SettingsPageMobile";
import { useEffect, useState } from "react";
// import { getSession } from "next-auth/react";

import client from '../components/GraphQL';
import axios from 'axios';

export default function Settings() {
  const {data} = useSession()
  const [windowType, setWindowType] = useState(0);
  const [reviews, setReviews] = useState([]);

  const get_setup = async () => {
    if(data === null) return window.location.href = "/login";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var type = 0;
    var typeValues = ['Following', 'Ratings', 'Settings'];
    if(urlParams.get('type')){
        let urlparamtype = urlParams.get('type');
        type = typeValues.findIndex((e) => e === urlparamtype)
        type = type ? type: 0;
        setWindowType(type);  
    }
    let UserChanges = await axios.post('api/User/GetUser', {})
    // reviews = reviews.map((e) => {
    //   let date = new Date(e.createdate)
    //   e.formatedDate = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate() + ', '  +date.getFullYear()
    //   return e
    // })
    setUserFollow(UserChanges.data.user_follow) 
    setUser(UserChanges.data.user)
    setReviews(UserChanges.data.reviews)
  }
  useEffect( () => {
    get_setup()
  }, [data]);
  // if(!data){
  //   console.log('user not found: ', data)
  //   window.location.href = "/login";
  // } 
  const [user, setUser] = useState({verified: true})
  const [userFollow, setUserFollow] = useState([])


  return (
    <div className="">
      {/* {(data)? */}
      <div>
      <HeroNoBtn setLargeTextTop={"User Profile"} setLargeTextBottom={" "} setSmallText={" "}/>
      <SettingsPageMobile reviews={reviews} user={user} userFollow={userFollow} type={windowType}/>
      <SettingsPage reviews={reviews} user={user} userFollow={userFollow} type={windowType}/>
      </div>
      {/* :null} */}
    </div>
  );
  
}

// export async function getServerSideProps(ctx){
  
//   const user = await getSession(ctx)
//   if(!user){
//     return {props: {user: null}}
//   }


//   const IndividualID = "Nate-Torres"
//   const Individual_values = await client.query({query:LOAD_INDIVIDUAL_PAGE, variables: { linkname: IndividualID }})
//   return {
//     props: {
//       Individual_values: Individual_values.data.getEachIndividual.rows[0],
//       reviews: Individual_values.data.getEachIndividual.reviews,
//       user: user.user,
//       IndividualID
//     }
//   }
// }