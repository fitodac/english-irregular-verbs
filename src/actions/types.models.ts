export type stageType = [
	{
		id: number
		idx: number
	}
]

export type gameType = [
	{
		id: number
		name: string
		cleared: number
		stage_id: number
	}
]

export type levelType = [
	{
		id: number
		idx: number
		game_id: number
		pairs_id: any
		sentences_id: any
	}
]

export type modeType = [
	{
		id: number
		sentence?: string
		options?:
			| string
			| [string]
			| any
			| [{ id: number; word: string; translation: string }]
		word_id?: number
	}
]

export type settingsTableType = [
	{
		id: number
		key: string
		value: string
	}
]

export type translationsType = [
	{ id: number; word: string; translation: string }
]

export type settingsType = { [key: string]: string }
