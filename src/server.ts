import { generate } from "./agent";
import { addCache, clearCache, getCache } from "./utils/cache";
import { clearMessages } from "./utils/messages";

export async function startServer() {
  const port = process.env.PORT || 3000;
  const development = process.env.NODE_ENV !== "production";

  const htmlHeaders = { headers: { "Content-Type": "text/html" } };

  Bun.serve({
    routes: {
      "/": Response.redirect("/home"),
      "/clear": async req => {
        clearMessages();
        clearCache();
        console.log("Cache and Messages cleared!");
        return Response.redirect("/home");
      },
      "/:prompt": async req => {
        console.log("GET:", req.params.prompt);
        const userPrompt = req.params.prompt === "" ? "home" : req.params.prompt;

        if (userPrompt === "favicon.ico") {
          return new Response(Bun.file("./favicon.ico"));
        }

        const cachedResponse = getCache(userPrompt);
        if (cachedResponse) {
          console.log("From cache:", userPrompt)
          return new Response(cachedResponse, htmlHeaders);
        }

        const response = await generate(userPrompt);
        addCache(userPrompt, response)
        return new Response(response, htmlHeaders);
      },
    },
    idleTimeout: 255,
    port,
    development,
    fetch(req) {
      return new Response("Not Found", { status: 404 });
    }
  })
  console.log(`Server started on port ${port}`);
}