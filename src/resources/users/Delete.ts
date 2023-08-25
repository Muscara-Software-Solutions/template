import * as Drash from "https://deno.land/x/drash@v2.7.1/mod.ts";
import { Base } from "./Base.ts";
import { database } from "../../deps.ts";
import { User } from "../../schema.ts";

export default class Delete extends Base {
  public paths = this.prefixPaths("deleteUser", [""])

  public async GET(
    request: Drash.Request,
    response: Drash.Response
  ): Promise<void> {
    const id = request.queryParam("id")!;

    if(!id) {
      throw new Drash.Errors.HttpError(
        400,
        "This resource requires the `id` parameter."
      );
    }

    const { users } = await database.readJSON<User>();
    const doesUserExist = users.filter((obj) => {
      return obj.id == id
    });

    if(doesUserExist.length <= 0) {
      throw new Drash.Errors.HttpError(
        404,
        "Unauthorized Request: No user with that id exists."
      );
    } else {
      const userIndex = users.findIndex(user => user.id == id);
      users.splice(userIndex, 1);

      await database.writeJSON(users);
      response.json({ status: 200 });
    }

  }
}