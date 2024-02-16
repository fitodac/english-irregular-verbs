'use server'
import { env } from '@/config'
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(env.DB)
import { getLevels, closeDbConnection } from '.'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const getGames = (stage_idx: number) => {
	if (!stage_idx) return

	return new Promise((resolve, reject) => {
		db.all(
			`SELECT * FROM games WHERE stage_id = ${stage_idx}`,
			(err: any, rows: gameType) => {
				if (err) {
					console.log(err)
					reject(err)
					return
				}

				resolve(rows)
				closeDbConnection()
			}
		)
	})
}

export const getGame = async (id: number) => {
	if (!id) return

	return new Promise((resolve, reject) => {
		db.get(
			`SELECT * FROM games WHERE id = ${id}`,
			async (err: any, game: gameType[]) => {
				if (err) {
					console.log(err)
					reject(err)
					return
				}

				const levels = (await getLevels(id)) as levelType

				resolve({
					game,
					levels,
				})
				closeDbConnection()
			}
		)
	})
}

export const clearGame = async (id: number) => {
	return new Promise((resolve, reject) => {
		db.run(
			`UPDATE games SET cleared = 1 WHERE id = ${id}`,
			(err: any, row: gameType) => {
				if (err) {
					console.log(err)
					reject(err)
				}

				resolve(row)
				revalidatePath('/')
				closeDbConnection()
			}
		)
	})
}

export const gameReset = () => {
	cookies().delete('irregularVerbsGame')
	cookies().delete('irregularVerbsLevel')

	return new Promise(async (resolve, reject) => {
		db.run(`UPDATE settings SET value = 3 WHERE key = "lives"`)
		db.run(`UPDATE settings SET value = 0 WHERE key = "coins"`)
		// db.run(`UPDATE games SET cleared = 0 WHERE id IN (1,2,3,4)`)

		resolve(true)
		closeDbConnection()
		revalidatePath('/')
	})
}
