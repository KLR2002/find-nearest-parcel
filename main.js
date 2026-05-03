import app from "./find-nearest-parcel-back/server.js";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";

app.use("/assets/*", serveStatic({ root: "./find-nearest-parcel-front/dist" }));

app.get("*", async (c) => {
  const html = await Deno.readTextFile("./find-nearest-parcel-front/dist/index.html");
  return c.html(html);
});

Deno.serve({port: 5174}, app.fetch);