import { signIn, signOut, useSession } from "next-auth/react";
import HeroNoBtn from "../components/Hero/HeroNoBtn";
import SettingsPage from "../components/Protected/settings/SettingsPage";
import SettingsPageMobile from "../components/Protected/settings/SettingsPageMobile";
import {LOAD_INDIVIDUAL_PAGE} from '../GraphQL/Queries/Individual';
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import client from '../components/GraphQL';
import axios from 'axios';

export default function Settings(props) {
  if(!props) return window.location.href = "/login";
  const [user, setUser] = useState('')
  useEffect(async () => {
    if(!props.user) return window.location.href = "/login";
    // const token = localStorage.getItem('auth-token');
    let UserChanges = await axios.post('api/User/GetUser', {})
    console.log('GetUser: ', UserChanges)
  }, [props.user]);

  return (
    <div className="">
      <HeroNoBtn setLargeTextTop={"User Profile"} setLargeTextBottom={" "} setSmallText={" "}/>
      <SettingsPageMobile user={props.user}/>
      <SettingsPage reviews={props.reviews} user={props.user}/>
    </div>
  );
  
}

export async function getServerSideProps(ctx){
  
  const user = await getSession(ctx)
  if(!user){
    return {props: null}
  }


  const IndividualID = "Nate-Torres"
  const Individual_values = await client.query({query:LOAD_INDIVIDUAL_PAGE, variables: { linkname: IndividualID }})
  return {
    props: {
      Individual_values: Individual_values.data.getEachIndividual.rows[0],
      reviews: Individual_values.data.getEachIndividual.reviews,
      user: user.user,
      IndividualID
    }
  }
}