import { signIn, signOut, useSession } from "next-auth/react";
import HeroNoBtn from "../components/Hero/HeroNoBtn";
import SettingsPage from "../components/Protected/settings/SettingsPage";
import SettingsPageMobile from "../components/Protected/settings/SettingsPageMobile";
import {LOAD_INDIVIDUAL_PAGE} from '../GraphQL/Queries/Individual';
import client from '../components/GraphQL';

export default function Settings(props) {
  
  return (
    <div className="">
      <HeroNoBtn setLargeTextTop={"User Profile"} setLargeTextBottom={" "} setSmallText={" "}/>
      <SettingsPageMobile/>
      <SettingsPage reviews={props.reviews}/>
    </div>
  );
  
}

export async function getServerSideProps({query}){
  const IndividualID = "Nate-Torres"
  const Individual_values = await client.query({query:LOAD_INDIVIDUAL_PAGE, variables: { linkname: IndividualID }})
  return {
    props: {
      Individual_values: Individual_values.data.getEachIndividual.rows[0],
      reviews: Individual_values.data.getEachIndividual.reviews,
      IndividualID
    }
  }
}