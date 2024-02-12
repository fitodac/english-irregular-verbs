'use server'
import { env } from '@/config'
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(env.DB)

export const closeDbConnection = () => {
	db.close((err: any) => {
		if (err) console.error(err.message)
		// console.log('Connection closed...')
	})
}
