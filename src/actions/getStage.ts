'use server'
import { env } from '@/config'
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(env.DB)
import { getGames, closeDbConnection, stageType, gameType } from '.'

const getData = (idx: number) => {
	if (!idx) return

	return new Promise((resolve, reject) => {
		db.all(
			`SELECT * FROM stages WHERE id = ${idx}`,
			(err: any, rows: stageType) => {
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

export const getStage = async (idx: number) => {
	try {
		const data = (await getData(idx)) as stageType
		const games = (await getGames(idx)) as gameType

		return { stage: data[0], games }
	} catch (err) {
		console.log('error', err)
	}
}
