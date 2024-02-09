'use client'
import { Button, Spinner } from '@nextui-org/react'
import { setGame, setLevel, gameType } from '@/actions'

export const GameList = ({ games }: { games: gameType }) => {
	const initGame = (id: number) => {
		setGame(`${id}`)
		setLevel('1')
	}

	return (
		<>
			{/* <pre>{game}</pre> */}
			<div className="grid grid-cols-2 gap-8 mt-6">
				{games.map(({ id, name, cleared }) => (
					<div key={`game-${id}`}>
						<Button
							size="lg"
							color="primary"
							className="w-full"
							disabled={cleared ? true : false}
							onClick={() => initGame(id)}
						>
							{name}
						</Button>
					</div>
				))}
			</div>
		</>
	)
}
