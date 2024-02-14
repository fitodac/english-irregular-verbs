'use server'
import { cookies } from 'next/headers'
import { getGame, clearGame, coinsAdd, addLife } from '.'

/**
 * set game
 * @param game_id
 */
export const setGame = (game_id: string) => {
	cookies().set('irregularVerbsGame', game_id)
}

/**
 * set level
 * @param level_id
 */
export const setLevel = (level_id: string) => {
	cookies().set('irregularVerbsLevel', level_id)
}

/**
 * check for final level
 * @param level_id
 * @returns
 */
const checkForFinalLevel = async (level_id: number) => {
	const gameID = cookies().get('irregularVerbsGame')
	const g = (await getGame(Number(gameID?.value))) as {
		game: [gameType]
		levels: levelType
	}
	if (g) {
		const { levels } = g
		return levels[levels.length - 1].id === level_id
	}

	return false
}

/**
 * next level
 */
export const nextLevel = async () => {
	await coinsAdd(5)
	const levelID = cookies().get('irregularVerbsLevel')
	const gameID = cookies().get('irregularVerbsGame')

	const lastLevel = await checkForFinalLevel(Number(levelID?.value))
	if (lastLevel) {
		await clearGame(Number(gameID?.value))
		await addLife()
	} else {
		cookies().set('irregularVerbsLevel', String(Number(levelID?.value) + 1))
	}
}

/**
 * clear cookies
 */
export const clearCookies = () => {
	cookies().delete('irregularVerbsLevel')
	cookies().delete('irregularVerbsGame')
}
