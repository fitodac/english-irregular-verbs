'use server'
import { env } from '@/config'
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(env.DB)
import { closeDbConnection } from '@/actions'

export const checkSentenceOption = (id: number) => {
	return new Promise((resolve, reject) => {
		db.get(
			`SELECT * FROM translations WHERE id = ${id}`,
			(err: any, row: any) => {
				if (err) {
					console.log(err)
					reject(err)
				}

				resolve(row)
				closeDbConnection()
			}
		)
	})
}
