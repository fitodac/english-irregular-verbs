import { cookies } from 'next/headers'
import { SentencesGameboard as Gameboard } from './components/SentencesGameboard'
import { env } from '@/config'

export const GameCompleteSentences = async (): Promise<JSX.Element> => {
	// Level
	const levelID = cookies().get('irregularVerbsLevel') as
		| RequestCookie
		| undefined
	const getLevel = await fetch(`${env.API_PATH}/level?id=${levelID?.value}`)
	const level = await getLevel.json()

	if (!level) return <></>

	return <Gameboard data={level} />
}
