import { signIn, signOut, useSession } from "next-auth/react";
import HeroNoBtn from "../components/Hero/HeroNoBtn";
import SettingsPage from "../components/Protected/settings/SettingsPage";
import SettingsPageMobile from "../components/Protected/settings/SettingsPageMobile";


export default function Settings() {
    
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
  return (
    <div className="">
      <HeroNoBtn setLargeTextTop={"User Profile"} setLargeTextBottom={" "} setSmallText={" "}/>
      <SettingsPageMobile/>
      <SettingsPage/>
    </div>
  );
  
}
