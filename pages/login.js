import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
    const {data} = useSession()
  return (
    <div>

      <nav>
        {!data ? ( <div>
          <button onClick={() => signIn("google")}>Google Connect</button>
          <button onClick={() => signIn("facebook")}>facebook Connect</button>
          </div>
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