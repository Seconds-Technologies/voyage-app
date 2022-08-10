import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import Auth0Provider from 'next-auth/providers/auth0'
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import prisma from '../../../db'
import Credentials from 'next-auth/providers/credentials'

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				email: {
					label: 'email',
					type: 'email'
				},
				password: {
					label: 'password',
					type: 'password'
				},
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				if (credentials == null) return null;
				const user = await prisma.user.findFirst({
					where: {
						email: {
							equals: credentials.email
						}
					}
				});
				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;
				}
			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		TwitterProvider({
			clientId: process.env.TWITTER_ID,
			clientSecret: process.env.TWITTER_SECRET,
			version: "2.0", // opt-in to Twitter OAuth 2.0
		}),
		Auth0Provider({
			clientId: process.env.AUTH0_CLIENT_ID,
			clientSecret: process.env.AUTH0_CLIENT_SECRET,
			issuer: process.env.AUTH0_ISSUER,
		}),
	],
	pages: {
		error: '/login',
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			if (user) {
				token.id = user.id
				token.email = user.email
			}
			return token
		},
		async session({ session, token }) {
			if (token) {
				session.id = token.id
			}
			return session
		}
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		// Set to jwt in order to CredentialsProvider works properly
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	jwt: {
		encryption: true,
	},
	debug: process.env.NODE_ENV !== 'production',
}

// @ts-ignore
export default (req, res) => NextAuth(req, res, authOptions)