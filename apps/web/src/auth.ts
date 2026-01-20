import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { fetchLogin, refreshAccessToken } from "./lib/apis/auth.api"
import type { JWT } from "next-auth/jwt";
import type { Session, User, Account } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions:any = {
  providers: [
      Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
    async signIn({ user, account }: { user: User; account: Account | null }) {
      // Handle Google OAuth sign in
      if (account?.provider === "google") {
        try {
          // Send Google user data to your API to create/find user
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                googleId: account.providerAccountId,
              }),
            }
          );

          if (res.ok) {
            const data = await res.json();
            // Attach tokens from your API to the user object
            user.accessToken = data.accessToken;
            // user.refreshToken = data.refreshToken;
            // user.role = data.user.role;
            user.id = data.user.id;
            return true;
          }
          return false;
        } catch (error) {
          console.error("Google sign in error:", error);
          return false;
        }
      }
      return true;
    },
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