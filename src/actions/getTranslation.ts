'use server'
import { env } from '@/config'
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(env.DB)
import { closeDbConnection, translationsType } from '.'

export const getTranslations = (ids: [string]) => {
	return new Promise((resolve, reject) => {
		db.all(
			`SELECT * FROM translations WHERE id IN (${ids})`,
			(err: any, rows: translationsType) => {
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

export const getTranslationsByWords = (words: string) => {
	return new Promise((resolve, reject) => {
		db.all(
			`SELECT * FROM translations WHERE word IN ${words}`,
			(err: any, rows: translationsType) => {
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
