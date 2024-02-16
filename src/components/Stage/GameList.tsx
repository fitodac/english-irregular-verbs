'use client'
import { Button, Spinner } from '@nextui-org/react'
import { setGame, setLevel } from '@/actions'
import { env } from '@/config'

export const GameList = ({ games }: { games: [gameType] }): JSX.Element => {
	const initGame = async (id: number) => {
		const getGame = await fetch(`${env.API_PATH}/game?id=${id}`)
		const { levels } = await getGame.json()
		setGame(`${id}`)
		setLevel(`${levels[0].id}`)
	}

	return (
		<>
			<div className="grid grid-cols-2 gap-6 mt-6">
				{games.map(
					({
						id,
						name,
						cleared,
					}: {
						id: number
						name: string
						cleared: number
					}) => (
						<div key={`game-${id}`}>
							<Button
								size="lg"
								color="primary"
								className="w-full"
								variant={!cleared ? 'solid' : 'light'}
								isDisabled={cleared ? true : false}
								onClick={() => initGame(id)}
							>
								{name}
							</Button>
						</div>
					)
				)}
			</div>
		</>
	)
}
