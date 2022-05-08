import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
    const {data} = useSession()
    // let session = null;
    // console.log('ses', ses)
  return (
    <div>
       
      <Head>
        <title>Auth Demo</title>
      </Head>

      <nav>
        {!data ? (
          <button onClick={() => signIn("google")}>Google Connect</button>
        ) : (
          <div>
            <span>{data.user.name}</span>
            <span>{data.user.email}</span>

            {data.user.image && (
              <img
                src={data.user.image}
                style={{ width: "25px", borderRadius: "50%" }}
              />
            )}
            <button onClick={signOut}>Sign Out</button>
          </div>
        )}
      </nav>
    </div>
  );
  
}