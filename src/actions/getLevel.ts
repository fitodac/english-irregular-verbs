'use server'
import { env } from '@/config'
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(env.DB)
import { closeDbConnection, getTranslations, getTranslationsByWords } from '.'

const getData = (id: number) => {
	if (!id) return

	return new Promise((resolve, reject) => {
		db.all(
			`SELECT * FROM levels WHERE id = ${id}`,
			(err: any, rows: levelType) => {
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

const getGameMode = ({ mode, id }: { mode: string; id: number | null }) => {
	if (!mode || !id) return

	return new Promise((resolve, reject) => {
		db.all(
			`SELECT * FROM ${mode} WHERE id = ${id}`,
			(err: any, rows: modeType) => {
				if (err) {
					console.log(err)
					reject(err)
					return
				}

				// console.log('pairs_options', pairs_options)

				resolve(rows)
			}
		)
	})
}

export const getLevels = (game_id: number) => {
	if (!game_id) return

	return new Promise((resolve, reject) => {
		db.all(
			`SELECT * FROM levels WHERE game_id = ${game_id} ORDER BY idx ASC`,
			(err: any, rows: []) => {
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

export const getLevel = async (id: number) => {
	try {
		const data = (await getData(id)) as [levelType]

		let game_mode: [any] = [{}]

		if (data.length) {
			game_mode = (await getGameMode({
				mode: data[0].pairs_id !== 'null' ? 'pairs' : 'sentences',
				id:
					data[0].pairs_id !== 'null'
						? parseInt(data[0].pairs_id)
						: parseInt(data[0].sentences_id),
			})) as [modeType]

			if (data[0].pairs_id !== 'null') {
				const ids = game_mode[0].options
					?.split('|')
					.map((e: string) => Number(e))
				const translations = await getTranslations(ids)
				game_mode[0].options = translations
			}

			if (data[0].sentences_id !== 'null') {
				const words = `(${game_mode[0].options
					?.split('|')
					.map((e: string) => `'${e}'`)})`
				const translations = await getTranslationsByWords(words)
				game_mode[0].options = translations
			}
		}

		return {
			level: data[0],
			game_mode: game_mode[0],
		}
	} catch (err) {
		console.log('error', err)
	}
}
