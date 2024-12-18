/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import {jwtDecode} from 'jwt-decode'
import fetchData from './fetch/fetchData'

declare module 'next-auth' {
  interface User {
    accessToken?: string
    refreshToken?: string
    refreshPayload?: any
    bearerPayload?: any
  }
}

function isValidCredentials(credentials: any): boolean {
  // Add your logic to validate the credentials here
  // For example:
  return credentials.email && credentials.password
}
async function refreshAccessToken(token: any) {
  try {
    const res = await fetchData({
      api: '/refresh-token',
      option: {
        body: JSON.stringify({
          refreshToken: token?.refreshToken,
        }),
      },
      method: 'POST',
    })
    return {
      ...token,
      accessToken: res.bearerToken,
      refreshToken: res.refreshToken ?? token.refreshToken,
    }
  } catch (error) {
    console.log('🚀 ~ refreshAccessToken ~ error:', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({token, user, account}) {
      if (token?.accessToken) {
        const decodedToken = jwtDecode(token.accessToken as string)
        token.exp = Number(decodedToken?.exp) * 1000
      }
      if (account && user) {
        return {
          ...token,
          ...user,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        }
      }
      if (token?.exp && Date.now() < token.exp - 5000) {
        return token
      }
      return refreshAccessToken(token)
    },
    async session({session, token}: {token: any; session: any}) {
      if (token) {
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
      }

      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          if (!isValidCredentials(credentials)) {
            throw new Error('Invalid credentials')
          }
          const request = {
            api: '/login',
            option: {
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            },
            method: 'POST',
          }
          const res = await fetchData(request)
          if (res?.bearerToken) {
            const user = {
              accessToken: res.bearerToken,
              refreshToken: res.refreshToken,
              refreshPayload: res.refreshPayload,
              bearerPayload: res.bearerPayload,
            }
            return user
          }
          throw new Error(res?.message)
        } catch (error) {
          console.log('🚀 ~ authorize: ~ error:', error)
          throw new Error('test')
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
})
