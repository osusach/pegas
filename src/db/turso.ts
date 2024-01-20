import { createClient } from "@libsql/client";
import { TURSO_URL, TURSO_TOKEN } from "$env/static/private";

export default createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});
