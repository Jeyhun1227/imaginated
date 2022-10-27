import client from '../components/GraphQL';
import {AUTHENTICATE_USER} from '../GraphQL/Mutations/Auth';
import React, { useEffect, useState } from "react";

export default function VerificationEmail({authenticateEmailUser}) {
    const [FormError, setFormError] = useState();
    useEffect(() => {
        if(authenticateEmailUser.errormessage){
            if(authenticateEmailUser.errormessage.length > 0) setFormError(authenticateEmailUser.errormessage[0])
        }
        let forwardPage = () => window.location.href = '/directory/login'
        setTimeout(forwardPage, 1500);

      }, [authenticateEmailUser]);

    return (
        <div className='mb-0 ml-4 text-large md:text-xl text-dark-blue'>{FormError ? FormError : 'Your Email has been registered successfully!'}
        </div>
    )
}


export async function getServerSideProps({query}){

    const token = query.token
    let token_given = null;
    if(token){
        token_given = await client.mutate({mutation: AUTHENTICATE_USER, variables: { token}})
    }else{
        token_given = {data: {authenticateEmailUser: {errormessage: ['Unauthorized']}}}
    }
    return {
      props: {
        // token ,
        authenticateEmailUser: token_given.data.authenticateEmailUser
      }
    }
}