// mirageServer.js
import { createServer, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.namespace = "api";
      this.get("user/checkLogged", (schema, request) => {
        return new Response(405, {}, { status: 405, message: "Not Logged" });
      });
    },
  });

  return server;
}
