/** @type {import('./$types').PageLoad} */
export function load({ params }: { params: { id: string } }) {
  return {
    id: params.id,
  };
}
