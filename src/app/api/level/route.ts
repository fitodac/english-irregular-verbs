import { getLevel } from '@/actions'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get('id')

	const resp = ((await getLevel(Number(id))) as getLevelType) ?? {}
	return Response.json(resp)
}

export async function POST(request: Request) {

}
