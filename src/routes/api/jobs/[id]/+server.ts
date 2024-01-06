import { json, type RequestHandler } from '@sveltejs/kit';
import client from '$db/turso';
import type { Offer } from '$lib/types';


/** @type {import('./$types').RequestHandler} */

// funcion get que recibe un id y devuelve un json con los datos de la oferta
export const GET: RequestHandler = async (request) => {
    const { params } = request;
    const { id } = params;
    console.log(`SELECT * FROM goodies id='${id}'`);
    const res = (await client.execute(`SELECT * FROM goodies id='${id}'`)).rows
    const offers: Offer[] = res.map((r) => {
        return {
            id: r.id as string,
            date: r.date as string,
            content: r.content as string,
            source: r.source as string,
        }
    
    });

    return json(offers);
}
// export async function GET(id: string) {
//     const res = (await client.execute(`SELECT * FROM goodies WHERE id = ${id}`)).rows
//     const offers: Offer[] = res.map((r) => {
//         return {
//             id: r.id as string,
//             date: r.date as string,
//             content: r.content as string,
//             source: r.source as string,
//         }
    
//     });

//     return json(offers);
// }