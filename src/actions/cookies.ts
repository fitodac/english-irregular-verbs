'use server'
import { cookies } from 'next/headers'

export const setGame = (game_id: string) => {
	cookies().set('irregularVerbsGame', game_id)
}

export const setLevel = (level_id: string) => {
	cookies().set('irregularVerbsLevel', level_id)
}
