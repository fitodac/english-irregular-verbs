import { cookies } from 'next/headers'
import { GamePairs, GameCompleteSentences } from '.'
import { getGame, getLevel } from '@/actions'

export const PlayGround = async (): Promise<JSX.Element> => {
	const gameID = cookies().get('irregularVerbsGame') as
		| RequestCookie
		| undefined
	const levelID = cookies().get('irregularVerbsLevel') as
		| RequestCookie
		| undefined

	const GAME = (await getGame(Number(gameID?.value))) as currentGameType
	const { levels } = GAME

	const LEVEL = (await getLevel(Number(levelID?.value))) as getLevelType
	const { level } = LEVEL

	return (
		<>
			{level ? (
				levels.length ? (
					<>
						{level && <div className="font-bold">Level {level.idx}</div>}

						{level.pairs_id !== 'null' && <GamePairs />}
						{level.sentences_id !== 'null' && <GameCompleteSentences />}
					</>
				) : (
					<div className="text-red-500 font-semibold text-center py-10">
						Este nivel aún no tiene juegos
					</div>
				)
			) : (
				<div className="h-1/2 flex justify-center items-center select-none">
					<div className="text-2xl font-medium text-center  ">
						Level cleared
					</div>
				</div>
			)}
		</>
	)
}
