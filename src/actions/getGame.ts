'use server'
import { env } from '@/config'
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(env.DB)
import { getLevels, closeDbConnection } from '.'

const getData = (id: number) => {
	if (!id) return

	return new Promise((resolve, reject) => {
		db.all(
			`SELECT * FROM games WHERE id = ${id}`,
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
	try {
		const data = (await getData(id)) as gameType
		const levels = (await getLevels(id)) as levelType

		return {
			game: data[0],
			levels,
		}
	} catch (err) {
		console.log('error', err)
	} finally {
	}
}
