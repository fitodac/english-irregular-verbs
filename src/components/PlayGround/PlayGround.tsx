import { getGame, getLevel } from '@/actions'
import { cookies } from 'next/headers'
import {
	gameType,
	levelType,
	levelModelType,
	GamePairs,
	GameCompleteSentences,
} from '.'

export const PlayGround = async () => {
	// Game
	// const cookieGame = cookies().get('irregularVerbsGame') as
	// 	| RequestCookie
	// 	| undefined
	// const game =
	// 	cookieGame && ((await getGame(Number(cookieGame.value))) as gameType)

	// Level
	const cookieLevel = cookies().get('irregularVerbsLevel') as
		| RequestCookie
		| undefined
	// const level =
	// 	cookieLevel &&
	// 	(game?.levels.filter(
	// 		(l) => l.idx === parseInt(cookieLevel.value)
	// 	)[0] as levelType)

	const data =
		cookieLevel &&
		((await getLevel(Number(cookieLevel.value))) as levelModelType)

	return (
		<>
			<div className="font-bold">Level {data?.level.idx}</div>

			{data?.level.pairs_id !== 'null' && <GamePairs />}
			{data?.level.sentences_id !== 'null' && <GameCompleteSentences />}

			<div className="space-y-5 mt-10">
				{/* <pre>{JSON.stringify(cookieGame, null, 2)}</pre> */}
				{/* <pre>{JSON.stringify(cookieLevel, null, 2)}</pre> */}
				{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
				{/* <pre>{JSON.stringify(level, null, 2)}</pre> */}
				{/* <pre>{JSON.stringify(game, null, 2)}</pre> */}
			</div>
		</>
	)
}
