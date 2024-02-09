'use server'
import { env } from '@/config'
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(env.DB)
import { closeDbConnection, settingsTableType, settingsType } from '.'

const getData = () => {
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

export const getSettings = async () => {
	try {
		const data = (await getData()) as settingsType
		return data
	} catch (err) {
		console.log('error', err)
	}
}
