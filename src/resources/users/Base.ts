import * as Drash from "https://deno.land/x/drash@v2.7.1/mod.ts";

export class Base extends Drash.Resource {
  #prefixes: { [k: string]: string } = {
    getUsers: "/users",
    createUser: "/user/create",
    updateUser: "/user/update",
    deleteUser: "/user/delete"
  };

  protected prefixPaths(
    prefix: string,
    paths: string[]
  ) {
    return paths.map((path) => this.#prefixes[prefix] + path);
  }
}