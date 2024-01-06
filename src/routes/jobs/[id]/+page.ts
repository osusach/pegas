/** @type {import('./$types').PageLoad} */
export function load({ params }: { params: { id: string } }) {
    console.log(params);
	return {
		props: {
			id: params.id,
		},
	};
}
