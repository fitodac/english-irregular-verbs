export type gameType = {
	game: { [key: string]: string | number }
	levels: [{ [key: string]: string | number }]
}

export type levelType = {
	id: number
	idx: number
	game_id: number
	pairs_id: any
	sentences_id: any
}

export type translationType = {
	id: number
	word: string
	translation: string
}

export type translationWordType = { id: number; word: string; enabled: boolean }
export type translationTranslationType = {
	id: number
	translation: string
	enabled: boolean
}

export type levelModelType = {
	level: levelType
	game_mode: {
		id: number
		sentence?: string
		options?: [translationType]
		word_id?: number
	}
}
