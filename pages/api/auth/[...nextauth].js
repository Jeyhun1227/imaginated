import NextAuth from "next-auth";
import Providers from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

export default (req, res) =>{
    return NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Email", type: "text", placeholder: "email" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          const user = { id: 'cl6a08bxq0006tez2mt9h0x44', name: "test test", email: "testing@gmail.com" }
          console.log('credentials: ', credentials)
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            console.log('USER: ', user)
            return user
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
      })
    ],
    debug: process.env.NODE_ENV === "development",
    secret: process.env.AUTH_SECRET,
    callbacks: {
      jwt: ({ token, user }) => {
        // first time jwt callback is run, user object is available
        console.log('token: ', token, 'user: ', user)
        if (user) {
          token.id = user.id;
        }
  
        return token;
      },
      session: ({ session, token }) => {
        console.log('session: ', session, 'token: ', token)
        if (token) {
          session.id = token.id;
        }
  
        return session;
      },
    },
    session: {
      strategy: 'jwt',
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    adapter: PrismaAdapter(prisma),
    pages: {
      signIn: '/login',
      newUser: '/' // New users will be directed here on first sign in (leave the property out if not of interest)
    }

  });

}