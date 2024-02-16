

const randomOrder = (options: [translationType] | undefined) => {
	const keys = options && (Object.keys(options) as [string])

	if (typeof keys === 'object') {
		for (let i = keys.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[keys[i], keys[j]] = [keys[j], keys[i]]
		}
	}

	return keys
}

export const setPairsOrder = (options: [translationType] | undefined) => {
	const words: [translationWordType?] = []
	const translations: [translationTranslationType?] = []

	const randomWords: [string] | undefined = randomOrder(options)

	if (typeof options === 'object' && randomWords) {
		randomWords.forEach((i) => {
			const idx = Number(i)
			return words.push({
				id: options[idx].id,
				word: options[idx].word,
				enabled: true,
			})
		})
	}

	const randomTranslations: [string] | undefined = randomOrder(options)

	if (typeof options === 'object' && randomTranslations) {
		randomTranslations.forEach((i) => {
			const idx = Number(i)
			return translations.push({
				id: options[idx].id,
				translation: options[idx].translation,
				enabled: true,
			})
		})
	}

	return { words, translations }
}

export const setSentencesOrders = (options: [translationType] | undefined) => {
	const rand = randomOrder(options)
	const arr: any = []
	options && rand?.forEach((i: string) => arr.push(options[Number(i)]))
	return arr
}
