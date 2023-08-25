import { ResourceLoaderService } from "https://deno.land/x/drash@v2.7.1/src/services/resource_loader/resource_loader.ts";
import { TengineService } from "https://deno.land/x/drash@v2.7.1/src/services/tengine/tengine.ts";
import { DexterService } from "https://deno.land/x/drash@v2.7.1/src/services/dexter/dexter.ts";
import { CORSService } from "https://deno.land/x/drash@v2.7.1/src/services/cors/cors.ts";
import { DbJSON } from "https://deno.land/x/dbjson@0.1.0/mod.ts";

// View engine
const tengine = new TengineService({
  views_path: "./src/views",
});

// Database 
const database = new DbJSON("./data/index.json", "users");

// Logging service
const dexterService = new DexterService({ 
  url: true,
  method: true 
});

// Resource loader service (router)
const resourceLoaderService = new ResourceLoaderService({
  paths_to_resources: [
    "src/resources"
  ]
});

// Security service
const cors = new CORSService();

export { 
  dexterService,
  resourceLoaderService,
  database,
  tengine,
  cors
};