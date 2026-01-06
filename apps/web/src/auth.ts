import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { fetchLogin, refreshAccessToken } from "./lib/apis/auth.api"
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

export const authOptions:any = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await fetchLogin({
          email: credentials?.email as string,
          password: credentials?.password as string
        })

        if (!user.success) return null

        // Return a proper User object with required id field
        return {
          id: user.data.id,
          email: user.data.email,
          accessToken: user.data.accessToken,
          refreshToken: user.data.refreshToken,
          accessTokenExpires: Date.now() + user.data.expiresIn * 1000, // example
          role:user.data.role
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          accessToken: (user as any).accessToken,
          refreshToken: (user as any).refreshToken,
          accessTokenExpires: (user as any).accessTokenExpires,
          role: (user as any).role
        };
      }

      if (!token.accessTokenExpires) {
        return token;
      }
    
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      return await refreshAccessToken(token);
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user = session.user || {};
        (session.user as any).id = token.id as string;
        (session.user as any).accessToken = token.accessToken;
        (session.user as any).refreshToken = token.refreshToken;
        (session.user as any).accessTokenExpires = token.accessTokenExpires;
        (session.user as any).role = token.role;
      }
      (session as any).error = token.error;
      if (token.error) {
        // Optionally, you can force sign out or show a message to the user here
        // Example: signOut();
        console.warn('Session error:', token.error);
      }
      return session;
    }
  },
  session: {
    strategy: "jwt"
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);