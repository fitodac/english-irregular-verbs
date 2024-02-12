'use server'
import { getGame } from '@/actions'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get('id')

	const game = await getGame(Number(id))
	return game ? Response.json(game) : Response.json({ game: { cleared: null } })
}
