import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@lib/db";

export default NextAuth({
  secret: process.env.AUTH_SECRET,

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        phone: {
          label: "phone",
          type: "text",
        },
      },
      async authorize(credentials) {
        const { phoneNumber } = credentials;

        try {
          const user = await query(
            `
            SELECT * FROM users WHERE phone = ?
            `,
            [phoneNumber]
          );

          if (!user[0]) {
            throw new Error("User not found: " + phoneNumber);
          }
          if (user[0].code != -1) {
            throw new Error("User not verified: " + phoneNumber);
          }

          return {
            user: {
              _id: 2,
              fN: "m",
              lN: "s",
            },
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.user = user;
          }
          return token;
        },
        async session(session, token) {
          session.token = token;
          return session;
        },
      },
    }),
  ],
});
