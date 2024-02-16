'use server'
import { env } from '@/config'
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(env.DB)
import { getGames, closeDbConnection } from '.'

export const getStage = async (idx: number) => {
	if (!idx) return

	return new Promise((resolve, reject) => {
		db.get(
			`SELECT * FROM stages WHERE id = ${idx}`,
			async (err: any, row: stageType[]) => {
				if (err) {
					console.log(err)
					reject(err)
					return
				}

				const games = (await getGames(idx)) as gameType
				resolve({ stage: row, games })
				closeDbConnection()
			}
		)
	})
}
