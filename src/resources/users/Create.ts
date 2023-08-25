import * as Drash from "https://deno.land/x/drash@v2.7.1/mod.ts";
import { Base } from "./Base.ts";
import { database } from "../../deps.ts";
import { User } from "../../schema.ts";

export default class Create extends Base {
  public paths = this.prefixPaths("createUser", [""])

  public async GET(
    request: Drash.Request,
    response: Drash.Response
  ): Promise<void> {
    const email = request.queryParam("email")!;
    const name = request.queryParam("name")!;

    if(!name) {
      throw new Drash.Errors.HttpError(
        400,
        "This resource requires the `name` parameter."
      );
    } else if(!email) {
      throw new Drash.Errors.HttpError(
        400,
        "This resource requires the `email` parameter."
      );
    } else if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))) {
      throw new Drash.Errors.HttpError(
        403,
        "Unauthorized Request: Please provide a valid email address."
      );
    }

    const { users } = await database.readJSON<User>();
    const doesUserExist = users.filter((obj) => {
      return obj.email == email
    });

    if(doesUserExist.length <= 0) {
      const user = {
        id: crypto.randomUUID(),
        name,
        email 
      }

      users.push(user);
      await database.writeJSON(users);

      response.json({ status: 200, user });
    } else {
      throw new Drash.Errors.HttpError(
        403,
        "Unauthorized Request: User with that email already exists."
      );
    }
  }
}