import { signIn, signOut, useSession } from "next-auth/react";

import SettingsPage from "../components/Protected/settings/SettingsPage";

export default function Settings() {
    
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
  return (
    <div className="">
      <SettingsPage/>
    </div>
  );
  
}
