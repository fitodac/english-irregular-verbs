'use server'
import { cookies } from 'next/headers'
import { gameReset } from '@/actions'

export async function GET() {
	await gameReset()

	let checkGameCookie = cookies().has('irregularVerbsGame')
	let checkLevelCookie = cookies().has('irregularVerbsGame')

	if (checkGameCookie) {
		cookies().delete('irregularVerbsGame')
		checkGameCookie = false
	}

	if (checkLevelCookie) {
		cookies().delete('irregularVerbsLevel')
		checkLevelCookie = false
	}

	return Response.json({
		game: checkGameCookie,
		level: checkLevelCookie,
	})
}
