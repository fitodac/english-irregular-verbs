'use server'
import { env } from '@/config'
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(env.DB)
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { closeDbConnection } from '.'

export const gameReset = () => {
	'use server'
	return new Promise(async (resolve, reject) => {
		if (cookies().has('irregularVerbsGame')) {
			cookies().delete('irregularVerbsGame')
		}

		if (cookies().has('irregularVerbsLevel')) {
			cookies().delete('irregularVerbsLevel')
		}

		db.run(
			`UPDATE settings SET value = 3 WHERE key = "lives"`,
			(err: any, row: any) => {
				if (err) {
					console.log(err)
					reject(err)
				}

				resolve(row)
				closeDbConnection()
			}
		)

		revalidatePath('/')
	})
}
