import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/savor-rest";
const client = new MongoClient(uri);
const dbName = process.env.MONGODB_DB_NAME || "savor-rest";
const db = client.db(dbName);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "default_development_secret_key_savor_restaurant_32chars",
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // 1. Add this block to expose the role field to your session
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user", // Automatically makes new users standard customers
      },
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
});
