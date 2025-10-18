import type { Context } from "@netlify/functions";

export default async (req, context: Context) => {
  setTimeout(() => {
    return new Response("Hello, world!")
  }, 30000)
}

export const config = {
  path: "/hello"
};