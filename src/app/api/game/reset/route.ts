'use server'
import { cookies } from 'next/headers'
import { gameReset } from '@/actions'

export async function GET() {
	await gameReset()

	const checkGameCookie = await cookies().has('irregularVerbsGame')

	return Response.json({
		game: checkGameCookie,
		level: cookies().has('irregularVerbsLevel'),
	})
}
