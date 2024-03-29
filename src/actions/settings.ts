'use server'
import { env } from '@/config'
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(env.DB)
import { closeDbConnection } from '.'
import { revalidatePath } from 'next/cache'

export const getSettings = async () => {
	return new Promise((resolve, reject) => {
		db.all('SELECT * FROM settings', (err: any, rows: settingsTableType) => {
			if (err) {
				console.log(err)
				reject(err)
				return
			}
			const res: settingsType = {}

			rows.forEach(({ key, value }) => {
				res[key] = value
			})
			resolve(res)
			closeDbConnection()
		})
	})
}

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

				console.log('VAL', val)

				db.run(
					`UPDATE settings SET value = ? WHERE key = "lives"`,
					[val - 1],
					(err: any) => {
						if (err) {
							console.log(err)
							reject(err)
						}

						resolve(true)
						closeDbConnection()
					}
				)

				if (val === 1) {
					console.log('GAME OVER')
					resolve(val)
					closeDbConnection()
					return
				}
			}
		)

		revalidatePath('/')
	})
}

/**
 * add coins
 * @param coins
 * @returns
 */
export const coinsAdd = (coins: number) => {
	return new Promise((resolve, reject) => {
		db.get(
			'SELECT value FROM settings WHERE key = "coins"',
			(err: any, row: settingsType) => {
				if (err) {
					console.log(err)
					reject(err)
				}

				const total = parseInt(row.value) + coins

				db.run(
					`UPDATE settings SET value = ${total} WHERE key = "coins"`,
					(err: any, row: settingsType) => {
						if (err) {
							console.log(err)
							reject(err)
						}

						resolve(row)
						closeDbConnection()
						revalidatePath('/')
					}
				)
			}
		)
	})
}

/**
 * Next stage
 * @returns
 */
export const nextStage = () => {
	return new Promise((resolve, reject) => {
		db.get(
			'SELECT value FROM settings WHERE key = "stage"',
			(err: any, row: settingsType) => {
				if (err) {
					console.log(err)
					reject(err)
				}

				const newStageValue = parseInt(row.value) + 1

				db.run(
					`UPDATE settings SET value = ${newStageValue} WHERE key = "stage"`,
					(err: any, row: settingsType) => {
						if (err) {
							console.log(err)
							reject(err)
						}

						resolve(row)
						closeDbConnection()
						revalidatePath('/')
					}
				)
			}
		)
	})
}

/**
 * Buy one life
 * @returns
 */
export const buyOneLife = () => {
	return new Promise(async (resolve, reject) => {
		db.get(
			'SELECT value FROM settings WHERE key = "coins"',
			async (err: any, res: { [key: string]: string }) => {
				if (err) {
					console.log(err)
					reject(err)
				}

				const coins: number = parseInt(res.value)

				if (coins >= 5) {
					db.run(
						`UPDATE settings SET value = ? WHERE key = "coins"`,
						[coins - 5],
						async () => {
							await addLife()
							resolve(true)
							closeDbConnection()
							// revalidatePath('/')
						}
					)
				}
			}
		)
	})
}
