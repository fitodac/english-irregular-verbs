const fs = require('fs')
const csv = require('csv-parser')
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(
	'db.sqlite',
	sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
	(err) => {
		if (err) {
			return console.error(err.message)
		}
		console.log('Connected to the SQlite database.')
	}
)

db.serialize(() => {
	// const settings = db.prepare('INSERT INTO settings VALUES (?,?,?)')
	// settings.run(1, 'lives', 3)
	// settings.finalize()
})

// STAGES
db.serialize(() => {
	db.run('CREATE TABLE stages (id INTEGER PRIMARY KEY, idx INTEGER UNIQUE)')

	fs.createReadStream('stages.csv')
		.pipe(csv())
		.on('data', ({ idx }) => {
			const stmt = db.prepare('INSERT INTO stages (idx) VALUES (?)')
			stmt.run(idx)
			stmt.finalize()
		})
		.on('end', () => {
			console.log('Stages table ready.')
		})
})

// GAMES
db.serialize(() => {
	db.run(
		'CREATE TABLE games (id INTEGER PRIMARY KEY, name TEXT, cleared INTEGER, stage_id INTEGER, FOREIGN KEY (stage_id) REFERENCES stages(id))'
	)

	fs.createReadStream('games.csv')
		.pipe(csv())
		.on('data', ({ id, name, cleared, stage_id }) => {
			const stmt = db.prepare(
				'INSERT INTO games (id, name, cleared, stage_id) VALUES (?, ?, ?, ?)'
			)
			stmt.run(id, name, cleared, stage_id)
			stmt.finalize()
		})
		.on('end', () => {
			console.log('Games table ready.')
		})
})

// LEVELS
db.serialize(() => {
	db.run(
		'CREATE TABLE levels (id INTEGER PRIMARY KEY, idx INTEGER, game_id INTEGER, pairs_id INTEGER, sentences_id INTEGER, FOREIGN KEY (game_id) REFERENCES games(id), FOREIGN KEY (pairs_id) REFERENCES pairs(id), FOREIGN KEY (sentences_id) REFERENCES sentences(id))'
	)

	fs.createReadStream('levels.csv')
		.pipe(csv())
		.on('data', ({ id, idx, game_id, pairs_id, sentences_id }) => {
			const stmt = db.prepare(
				'INSERT INTO levels (id,idx, game_id, pairs_id, sentences_id) VALUES (?, ?, ?, ?, ?)'
			)
			stmt.run(id, idx, game_id, pairs_id, sentences_id)
			stmt.finalize()
		})
		.on('end', () => {
			console.log('Levels table ready.')
		})
})

// TRANSLATIONS
db.serialize(() => {
	db.run(
		'CREATE TABLE translations (id INTEGER PRIMARY KEY, word TEXT, translation TEXT)'
	)

	fs.createReadStream('translations.csv')
		.pipe(csv())
		.on('data', ({ id, word, translation }) => {
			const stmt = db.prepare(
				'INSERT INTO translations (id, word, translation) VALUES (?, ?, ?)'
			)
			stmt.run(id, word, translation)
			stmt.finalize()
		})
		.on('end', () => {
			console.log('Translations table ready.')
		})
})

// PAIRS
db.serialize(() => {
	db.run('CREATE TABLE pairs (id INTEGER PRIMARY KEY, options TEXT)')

	fs.createReadStream('pairs.csv')
		.pipe(csv())
		.on('data', ({ id, options }) => {
			const stmt = db.prepare('INSERT INTO pairs (id, options) VALUES (?, ?)')
			stmt.run(id, options)
			stmt.finalize()
		})
		.on('end', () => {
			console.log('Pairs table ready.')
		})
})

// SENTENCES
db.serialize(() => {
	db.run(
		'CREATE TABLE sentences (id INTEGER PRIMARY KEY, sentence TEXT, options TEXT, word_id INTEGER)'
	)

	fs.createReadStream('sentences.csv')
		.pipe(csv())
		.on('data', ({ id, sentence, options, word_id }) => {
			const stmt = db.prepare(
				'INSERT INTO sentences (id,sentence, options, word_id) VALUES (?, ?, ?, ?)'
			)
			stmt.run(id, sentence, options, word_id)
			stmt.finalize()
		})
		.on('end', () => {
			console.log('Sentences table ready.')
		})
})

// SETTINGS
db.serialize(() => {
	db.run('CREATE TABLE settings (id INTEGER PRIMARY KEY, key TEXT, value TEXT)')

	fs.createReadStream('settings.csv')
		.pipe(csv())
		.on('data', ({ key, value }) => {
			const stmt = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)')
			stmt.run(key, value)
			stmt.finalize()
		})
		.on('end', () => {
			console.log('Settings table ready.')
			db.close()
		})
})
