import * as Drash from "https://deno.land/x/drash@v2.7.1/mod.ts";

export default class Auth extends Drash.Service {
  public async runBeforeResource(
    _request: Drash.Request,
    _response: Drash.Response
  ): Promise<void> {
    // ...
  }

  public async runAfterResource(
    _request: Drash.Request,
    _response: Drash.Response
  ): Promise<void> {
    // ...
  }
}