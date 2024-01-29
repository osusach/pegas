/** @type {import('./$types').PageLoad} */
export function load({ url }: { url: URL }) {
  let id = url.searchParams.get("id");

  return { id };
}
