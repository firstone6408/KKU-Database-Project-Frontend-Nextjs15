/** @format */

import NextAuth, { Account, Profile, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { urlConfig } from "@/configs/url.config";
import { validateResponseFromServer } from "@/utils/validate.utils";
import { LoginResSchema } from "@/schemas/api/login.schema";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Point of sale",
      credentials: {
        username: {
          label: "Username",
          type: "username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req)
      {
        if (!credentials)
        {
          return null;
        }

        const payload = {
          username: credentials.username,
          password: credentials.password,
        };

        // console.log("payload:", payload);

        const response = await axios.post(
          `${urlConfig.KKU_API_URL}/auth/login`,
          payload
        );

        const data = validateResponseFromServer(response, LoginResSchema)
          .payload.data;

        //console.log("User:", user);

        const user = data.user;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          image: user.profileImage,
          role: user.role,
          branchId: user.branchId ? String(user.branchId) : undefined,
          status: user.status,
          token: data.token,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
    })
    {
      // console.log("Account:", account);
      //  console.log("Profile:", profile);

      if (account?.provider === "google")
      {
        const payload = {
          email: profile?.email,
        };

        let response;

        try
        {
          // TODO ต้องไปทำ api เพิ่ม
          response = await axios.post(
            `${urlConfig.KKU_API_URL}/auth/login/provider`,
            payload
          );
        } catch (error)
        {
          throw new Error("Email not found");
        }

        const data = validateResponseFromServer(response, LoginResSchema)
          .payload.data;

        const fetchUser = data.user;

        user.branchId = fetchUser.branchId
          ? String(fetchUser.branchId)
          : undefined;
        user.role = fetchUser.role;
        user.status = fetchUser.status;
        user.token = data.token;
        if (fetchUser.profileImage)
        {
          user.image = fetchUser.profileImage;
        }
      }
      return true;
    },

    async jwt({
      token,
      user,
      trigger,
      session
    }: {
      token: JWT;
      user: User;
      trigger?: "signIn" | "signUp" | "update"
      session?: any;
    })
    {
      // เก็บข้อมูลที่ return จาก authorize ลงใน token
      if (user)
      {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.branchId = user.branchId;
        token.status = user.status;
        token.token = user.token;
      }

      // update branch id
      if (trigger === "update" && session)
      {
        token.branchId = session.branchId;
      }


      return token;
    },
    async session({ session, token }: { session: Session; token: any })
    {
      // เพิ่มข้อมูลที่คุณต้องการใน session
      if (token)
      {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.branchId = token.branchId;
        session.user.status = token.status;
        session.user.token = token.token;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
