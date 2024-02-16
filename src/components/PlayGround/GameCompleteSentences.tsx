import { cookies } from 'next/headers'
import { SentencesGameboard as Gameboard } from './components/SentencesGameboard'
import { getLevel } from '@/actions'

export const GameCompleteSentences = async (): Promise<JSX.Element> => {
	// Level
	const levelID = cookies().get('irregularVerbsLevel') as
		| RequestCookie
		| undefined

	const level = (await getLevel(Number(levelID?.value))) as getLevelType

	if (!level) return <></>

	return <Gameboard data={level} />
}
