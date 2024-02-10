'use client'
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { substractLife, nextLevel } from '@/actions'

export const PairsGameboard = ({
	words,
	translations,
	level,
}: {
	words: [translationWordType]
	translations: [translationTranslationType]
	level: number
}) => {
	const [w, setW] = useState(words)
	const [t, setT] = useState(translations)
	const [selectedWord, setSelectedWord] = useState(null) as any
	const [selectedTranslation, setSelectedTranslation] = useState(null) as any
	const [wErr, set_wErr] = useState(null) as any
	const [tErr, set_tErr] = useState(null) as any

	const checkOptions = async () => {
		if (selectedWord && selectedTranslation) {
			if (selectedWord === selectedTranslation) {
				const wordIdx = w.findIndex((e) => e.id === selectedWord)
				const tempW: [translationWordType] = [...w]
				tempW[wordIdx].enabled = false
				setW(tempW)

				const translationIdx = t.findIndex((e) => e.id === selectedTranslation)
				const tempT: [translationTranslationType] = [...t]
				tempT[translationIdx].enabled = false
				setT(tempT)

				if (
					!w.filter((e) => e.enabled).length &&
					!t.filter((e) => e.enabled).length
				) {
					setTimeout(() => nextLevel(), 800)
				}
			} else {
				set_wErr(selectedWord)
				set_tErr(selectedTranslation)
				substractLife()
			}

			setTimeout(() => {
				setSelectedWord(null)
				setSelectedTranslation(null)
				set_wErr(null)
				set_tErr(null)
			}, 600)
		}
	}

	useEffect(() => {
		checkOptions()
	}, [selectedWord, selectedTranslation])

	return (
		<div className="grid grid-cols-2 gap-6 mt-6">
			<div className="space-y-5">
				{w?.map((e) => (
					<Button
						key={`word-${e?.id}`}
						color={wErr === e.id ? 'danger' : 'primary'}
						size="lg"
						fullWidth
						onClick={() => setSelectedWord(e.id)}
						className={`${
							e.enabled && selectedWord && selectedWord !== e.id
								? 'opacity-50'
								: ''
						}`}
						variant={e.enabled ? 'solid' : 'light'}
						isDisabled={!e.enabled}
					>
						<span className="text-white">{e?.word}</span>
					</Button>
				))}
			</div>

			<div className="space-y-5">
				{t?.map((e) => (
					<Button
						key={`translation-${e?.id}`}
						color={tErr === e.id ? 'danger' : 'secondary'}
						size="lg"
						fullWidth
						onClick={() => setSelectedTranslation(e.id)}
						className={`${
							e.enabled && selectedTranslation && selectedTranslation !== e.id
								? 'opacity-50'
								: ''
						}`}
						variant={e.enabled ? 'solid' : 'light'}
						isDisabled={!e.enabled}
					>
						<span className="text-white">{e?.translation}</span>
					</Button>
				))}
			</div>
		</div>
	)
}
