'use server'
const fs = require('fs')
import { env } from '@/config'
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(env.DB)
import { revalidatePath } from 'next/cache'
import { closeDbConnection } from '.'

export const addLife = () => {
	return new Promise(async (resolve, reject) => {
		db.get(
			'SELECT value FROM settings WHERE key = "lives"',
			(err: any, row: { [key: string]: string }) => {
				if (err) {
					console.log(err)
					reject(err)
				}

				const val = parseInt(row.value)

				db.run(
					`UPDATE settings SET value = ? WHERE key = "lives"`,
					[val + 1],
					(err: any, row: any) => {
						if (err) {
							console.log(err)
							reject(err)
						}

						resolve(row)
						closeDbConnection()
					}
				)
			}
		)

		revalidatePath('/')
	})
}

export const substractLife = () => {
	return new Promise(async (resolve, reject) => {
		db.get(
			'SELECT value FROM settings WHERE key = "lives"',
			(err: any, row: { [key: string]: string }) => {
				if (err) {
					console.log(err)
					reject(err)
				}

				const val = parseInt(row.value)

				if (val > 0) {
					db.run(
						`UPDATE settings SET value = ? WHERE key = "lives"`,
						[val - 1],
						(err: any, row: any) => {
							if (err) {
								console.log(err)
								reject(err)
							}

							resolve(row)
							closeDbConnection()
						}
					)
				} else {
					resolve(val)
				}
			}
		)

		revalidatePath('/')
	})
}
