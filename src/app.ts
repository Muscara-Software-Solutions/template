import * as Drash from "https://deno.land/x/drash@v2.7.1/mod.ts";
import { load } from "https://deno.land/std@0.195.0/dotenv/mod.ts";

// Load .env file
const env = await load();

// Services
import { cors, dexterService, resourceLoaderService, tengine } from "./deps.ts";
import Auth from "./services/auth.ts";

import CustomErrorHandler from "./handler/Error.ts";

const server = new Drash.Server({
  error_handler: CustomErrorHandler,
  hostname: env["HOST"],
  port: parseInt(env["PORT"]),
  protocol: "http",
  services: [
    resourceLoaderService,
    dexterService,
    tengine,
    cors,
    new Auth()
  ]
});

server.run();
dexterService.logger.info(`Application Live: ${server.address}`);