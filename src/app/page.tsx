import { Header, Stage, PlayGround, GameCleared } from '@/components'
import { cookies } from 'next/headers'
import { env } from '@/config'

export default async function Home() {
	const gameCookie = cookies().get('irregularVerbsGame')

	const getGame = await fetch(`${env.API_PATH}/game?id=${gameCookie?.value}`, {
		next: { tags: ['get-game'] },
	})
	const resp = await getGame.json()
	const cleared = { value: resp.game?.cleared }

	return (
		<main className="max-w-sm h-screen mx-auto px-6">
			<Header />
			<div className="h-6"></div>
			{cleared.value === 1 && <GameCleared />}

			{cleared.value === 0 && <PlayGround />}
			{!cleared.value && cleared.value !== 0 && <Stage />}
		</main>
	)
}
