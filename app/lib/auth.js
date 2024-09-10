import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./client";


const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: {
                    label: 'email',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                password: {
                    label: 'password',
                    type: 'password',
                }
            },
            async authorize(credentials, req )   {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing email or password');
                }
                console.log(email, password);
                // Use absolute URL for server-side fetch calls
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user`, {
                        method: 'POST',
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                        headers: { 'Content-Type': 'application/json' },
                    });
                
                    if (!res.ok) {
                        throw new Error('Authentication failed');
                    }
                
                    const user = await res.json();
                    return user;
                } catch (error) {
                    console.error('Error during authorization', error);
                    return null;
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: '/',
        signOut: '/',
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 30,
        encryption: true,
    },
    callbacks: {
        async session({ session, token }) {
          // Attach the token to the session object
          if (token) {
            session.user = token;
          }
          return session;
        },
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.email = user.email;
          }
          return token;
        },
      },
};

export default authOptions 