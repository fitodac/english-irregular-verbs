import { translationWordType, translationTranslationType } from '.'
import { usePairs } from './hooks'
import { cookies } from 'next/headers'
import { PairsGameboard as Gameboard } from './components/PairsGameboard'

export const GamePairs = async () => {
	const { words, translations } = (await usePairs()) as {
		words: [translationWordType]
		translations: [translationTranslationType]
	}

	const cookieLevel = cookies().get('irregularVerbsLevel') as
		| RequestCookie
		| undefined

	return (
		<>
			<Gameboard
				words={words}
				translations={translations}
				level={Number(cookieLevel?.value)}
			/>

			{/* {data.game_mode} */}

			{/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
			{/* <pre>{JSON.stringify(selected, null, 2)}</pre> */}
		</>
	)
}
