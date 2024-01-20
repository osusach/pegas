import { json } from "@sveltejs/kit";
import client from "$db/turso";
import type { Offer } from "$lib/types";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const res = (await client.execute("SELECT * FROM goodies")).rows;
  const offers: Offer[] = res.map((r) => {
    return {
      id: r.id as string,
      date: r.date as string,
      content: r.content as string,
      source: r.source as string,
    };
  });

  return json(offers);
}
