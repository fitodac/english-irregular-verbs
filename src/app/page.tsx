import { Header, Stage, PlayGround, GameCleared, GameOver } from '@/components'
import { cookies } from 'next/headers'
import { getGame, getSettings } from '@/actions'

export default async function Home(): Promise<JSX.Element> {
	const gameCookie = cookies().get('irregularVerbsGame')

	const cleared: { value: any } = { value: null }

	if (gameCookie?.value.length) {
		const get_game = (await getGame(
			Number(gameCookie?.value)
		)) as currentGameType
		cleared.value = get_game.game.cleared
	}

	const settings = (await getSettings()) as settingsType

	if (!parseInt(settings.lives)) {
		return <GameOver />
	}

	if (cleared.value === 1) {
		return <GameCleared />
	}

	return (
		<>
			<Header />
			<div className="h-6"></div>

			{cleared.value === 0 && <PlayGround />}
			{!cleared.value && cleared.value !== 0 && <Stage />}
		</>
	)
}
