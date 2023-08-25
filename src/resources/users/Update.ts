import * as Drash from "https://deno.land/x/drash@v2.7.1/mod.ts";
import { Base } from "./Base.ts";
import { database } from "../../deps.ts";
import { User } from "../../schema.ts";

export default class Update extends Base {
  public paths = this.prefixPaths("updateUser", [""])

  public async GET(
    request: Drash.Request,
    response: Drash.Response
  ): Promise<void> {
    const id = request.queryParam("id")!;
    const email = request.queryParam("email")!;
    const name = request.queryParam("name")!;

    if(email) {
      if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))) {
        throw new Drash.Errors.HttpError(
          403,
          "Unauthorized Request: Please provide a valid email address."
        );
      }
    } else if(!id) {
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
      const newUser = {
        id,
        email: email == undefined ? users[userIndex].email : email,
        name: name == undefined ? users[userIndex].name : name
      }

      users[userIndex] = newUser;
      await database.writeJSON(users);

      response.json({ status: 200, user: newUser });
    }
  }
}