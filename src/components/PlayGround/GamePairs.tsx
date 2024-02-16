import { cookies } from 'next/headers'
import { PairsGameboard as Gameboard } from './components/PairsGameboard'
import { setPairsOrder } from './actions'
import { getLevel } from '@/actions'

export const GamePairs = async (): Promise<JSX.Element> => {
	// Level
	const levelID = cookies().get('irregularVerbsLevel') as
		| RequestCookie
		| undefined

	const LEVEL = (await getLevel(Number(levelID?.value))) as getLevelType
	const { game_mode } = LEVEL

	const { words, translations } = setPairsOrder(game_mode?.options) as {
		words: [translationWordType]
		translations: [translationTranslationType]
	}

	return (
		<>
			<Gameboard
				words={words}
				translations={translations}
				level={Number(levelID?.value)}
			/>
		</>
	)
}
