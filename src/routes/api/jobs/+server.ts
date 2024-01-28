import { json, type RequestHandler } from "@sveltejs/kit";
import client from "$db/turso";
import type { Offer } from "$lib/types";

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async (response: any) => {
    const  id  = response.url.searchParams.get('id');
  
  let query = `SELECT * FROM goodies WHERE id='${id}';`;
  if (id === null) {
    query = `SELECT * FROM goodies;`;
  }
  
  const res = await client.execute(query);
  
  if (res.rows.length === 0) {
    return json({ error: "Not found" });
  }
  const rows = res.rows;
  const offers: Offer[] = rows.map((r) => {
    return {
      id: r.id as string,
      date: r.date as string,
      content: r.content as string,
      source: r.source as string,
    };
  });

  return json(offers);
};