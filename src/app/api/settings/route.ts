'use server'
import { getSettings } from '@/actions'

export async function GET() {
	const settings = (await getSettings()) as settingsType
	return Response.json({ settings })
}
