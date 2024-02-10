import { getGame } from '@/actions'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get('id')

	const game = await getGame(Number(id))
	return Response.json({ game })
}
