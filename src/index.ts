import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import "dotenv/config";

import chatbot from "./chatbot";
import api from "./api";

const app = new Hono();
app.use("*", cors());
app.use("*", prettyJSON());
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.route("/chatbot/v1", chatbot);
app.route("/api/v1", api);

const port = process.env.PORT || "3000";

console.log(`Listening on port ${port}`);

serve({
	fetch: app.fetch,
	port: parseInt(port),
});
