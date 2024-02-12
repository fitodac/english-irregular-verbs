type settingsType = { [key: string]: string }

type RequestCookie = {
	key: string
	value: string
}

type gameType = {
	id: number
	name: string
	cleared: number
	stage_id: number
}

type stageScreenType = {
	stage: { [key: string]: number }
	games: any
}

type levelType = {
	id: number
	idx: number
	game_id: number
	pairs_id: any
	sentences_id: any
}

type translationType = {
	id: number
	word: string
	translation: string
}

type modeType = {
	id: number
	sentence?: string
	options?: [translationType]
	word_id?: number
}

type getLevelType = {
	level?: levelType
	game_mode?: modeType
}

type translationWordType = { id: number; word: string; enabled: boolean }

type translationTranslationType = {
	id: number
	translation: string
	enabled: boolean
}

type currentGameType = {
	game: gameType
	levels: [levelType]
}
