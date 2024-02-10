import { getStage } from '@/actions'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get('id')

	const stage = (await getStage(Number(id))) as stageScreenType
	return Response.json(stage)
}
