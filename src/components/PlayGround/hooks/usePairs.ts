import { getLevel } from '@/actions'
import { cookies } from 'next/headers'
import { levelModelType } from '..'
import { setPairsOrder } from '../actions'

export const usePairs = async () => {
	const cookieLevel = cookies().get('irregularVerbsLevel') as
		| RequestCookie
		| undefined

	const data =
		cookieLevel &&
		((await getLevel(Number(cookieLevel.value))) as levelModelType)

	const { words, translations } = setPairsOrder(data?.game_mode.options)

	return {
		words,
		translations,
	}
}
