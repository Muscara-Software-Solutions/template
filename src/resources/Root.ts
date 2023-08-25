import * as Drash from "https://deno.land/x/drash@v2.7.1/mod.ts";
import { load } from "https://deno.land/std@0.195.0/dotenv/mod.ts";
const env = await load();

export default class RootResource extends Drash.Resource {
  public paths = ["/"];

  public async GET(
    _request: Drash.Request,
    response: Drash.Response
  ): Promise<void> {
    const userResponse = await fetch(`http://${env["HOST"]}:${env["PORT"]}/users`);
    const { users } = await userResponse.json();
    
    const content = response.render("/index.html", { users }) as string;

    response.html(content);
  }
}