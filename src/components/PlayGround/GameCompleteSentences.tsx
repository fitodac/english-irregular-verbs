import { getLevel } from '@/actions'
import { cookies } from 'next/headers'
import { levelModelType } from '.'
import { SentencesGameboard as Gameboard } from './components/SentencesGameboard'

export const GameCompleteSentences = async () => {
	const cookieLevel = cookies().get('irregularVerbsLevel') as
		| RequestCookie
		| undefined

	const data =
		cookieLevel &&
		((await getLevel(Number(cookieLevel.value))) as levelModelType)

	if (!data) return <></>

	return <Gameboard data={data} level={Number(cookieLevel.value)} />
}
