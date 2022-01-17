import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    refreshToken?: string;
    accessToken?: string;
    idToken?: string;
  }
}

declare module "next-auth" {
  interface Session {
    token: JWT;
  }
}
