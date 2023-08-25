import * as Drash from "https://deno.land/x/drash@v2.7.1/mod.ts";
import { Base } from "./Base.ts";
import { database } from "../../deps.ts";
import { User } from "../../schema.ts";

export default class Get extends Base {
  public paths = this.prefixPaths("getUsers", ["/:id?"])

  public async GET(
    request: Drash.Request,
    response: Drash.Response
  ): Promise<void> {
    const user_id = request.pathParam("id")!;
    const { users } = await database.readJSON<User>();

    if(user_id) {
      const doesUserExist = users.filter((obj) => {
        return obj.id == user_id
      });

      if(doesUserExist.length <= 0) {
        response.json({ status: 404, user: [] })
      } else {
        response.json({ status: 200, user: doesUserExist[0] });
      }
    } else {
      response.json({ status: 200, users });
    }
  }
}