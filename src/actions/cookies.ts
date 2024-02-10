'use server'
import { cookies } from 'next/headers'
import { getGame } from '.'

export const setGame = (game_id: string) => {
	cookies().set('irregularVerbsGame', game_id)
}

export const setLevel = (level_id: string) => {
	cookies().set('irregularVerbsLevel', level_id)
}

const checkForFinalLevel = async (level_id: number) => {
	const gameID = cookies().get('irregularVerbsGame')
	const g = await getGame(Number(gameID?.value))
	if (g) {
		const { game, levels } = g
		return levels[levels.length - 1].idx === level_id
	}

	return false
}

export const nextLevel = async () => {
	const levelID = cookies().get('irregularVerbsLevel')
	const lastLevel = await checkForFinalLevel(Number(levelID?.value))
	if (lastLevel) 
	cookies().set('irregularVerbsLevel', String(Number(levelID?.value) + 1))
}
