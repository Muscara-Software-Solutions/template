import * as Drash from "https://deno.land/x/drash@v2.7.1/mod.ts";
import { dexterService } from "../deps.ts";

export default class CustomErrorHandler extends Drash.ErrorHandler {
  public catch(
    error: Error,
    _request: Request,
    response: Drash.Response,
  ): void {
    if(error instanceof Drash.Errors.HttpError) {
      response.status = error.code;
      return response.json({
        status: error.code,
        error: error.message,
      });
    }

    dexterService.logger.error(error.message);
    response.status = 500;

    return response.json({ error: "Server failed to process the request." });
  }
}