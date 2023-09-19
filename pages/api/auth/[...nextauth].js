import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "@lib/db";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        phone: {
          label: "phone",
          type: "text",
          placeholder: "Enter your phone",
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

          return {
            id: user[0].id,
            phone: user[0].phone,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
});
