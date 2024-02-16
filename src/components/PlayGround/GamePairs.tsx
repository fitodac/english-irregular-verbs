import { cookies } from 'next/headers'
import { PairsGameboard as Gameboard } from './components/PairsGameboard'
import { env } from '@/config'
import { setPairsOrder } from './actions'

export const GamePairs = async (): Promise<JSX.Element> => {
	// Level
	const levelID = cookies().get('irregularVerbsLevel') as
		| RequestCookie
		| undefined
	const getLevel = await fetch(`${env.API_PATH}/level?id=${levelID?.value}`)
	const { game_mode } = await getLevel.json()

	const { words, translations } = setPairsOrder(game_mode.options) as {
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
