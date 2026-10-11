// src/app/api/auth/[...all]/route.js
// import { auth } from "@/lib/auth";
import { auth } from "\u0018\u0018@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
