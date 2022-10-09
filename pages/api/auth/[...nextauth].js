import NextAuth from "next-auth";
import Providers from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
const PoolConnection = require('../postgressql')

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
        name: "Credentials",

        credentials: {
          username: { label: "Email", type: "text", placeholder: "email" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // console.log('credentials: ', credentials.email, credentials.password)
          const user_custom = await PoolConnection.query('SELECT DISTINCT * FROM "USER_CUSTOM" WHERE EMAIL = $1', [credentials.email])
          if(user_custom.rows.length > 0) {
            // console.log('customer', user_custom.rows)
            const user_all = user_custom.rows[0];
            const match = await bcrypt.compare(credentials.password, user_all.password);

            if(match){
              const user_image = await PoolConnection.query('SELECT DISTINCT * FROM "User" WHERE id = $1', [user_all.userid])

              return {id: user_all.userid, verified: user_all.verified, email: user_all.email, name: user_all.name, image: user_image.rows[0].image}
            } 
          }
          return null

        }
      })
    ],
    debug: process.env.NODE_ENV === "development",
    secret: process.env.AUTH_SECRET,
    callbacks: {
      jwt: ({ token, user }) => {
        // first time jwt callback is run, user object is available
        // console.log("JWT: ", 'token: ', token, 'user: ', user)
        if (user) {
          token.id = user.id;
        }
  
        return token;
      },
      session: ({ session, token }) => {
        // console.log('SESSION: ','session: ', session, 'token: ', token)
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