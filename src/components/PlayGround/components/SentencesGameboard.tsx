'use client'
import { useEffect, useState } from 'react'
import { levelModelType, translationType } from '..'
import { Button } from '@nextui-org/react'
import { checkSentenceOption } from '../actions/checkSentenceOption'
import { setSentencesOrders } from '../actions'
import { substractLife } from '@/actions'

export const SentencesGameboard = ({
	data,
	level,
}: {
	data: levelModelType
	level: number
}) => {
	const sentence = data?.game_mode.sentence
		? data.game_mode.sentence.replace(/%/g, '_____')
		: ''

	const [options, setOptions] = useState([]) as any
	const [selected, setSelected] = useState(null) as any
	const [optionError, setOptionError] = useState(null) as any

	useEffect(() => {
		if (data?.game_mode?.options?.length) {
			setOptions(
				setSentencesOrders([...data.game_mode.options])
			) as translationType
		}
	}, [data])

	const selectOption = async (id: number) => {
		setSelected(id)
		const option = options.filter((e: translationType) => e.id === id)[0]

		const check =
			data.game_mode.word_id &&
			((await checkSentenceOption(data.game_mode.word_id)) as translationType)

		const sentenceEl = document.getElementById('sentence')

		if (check) {
			if (option.word === check.word) {
				if (sentenceEl && data.game_mode.sentence) {
					sentenceEl.innerHTML = data.game_mode.sentence.replace(
						/%/g,
						`<span class="text-warning font-semibold">${option.word}</span>`
					)
				}

				setTimeout(() => {
					// setLevel()
				}, 800)
			} else {
				setOptionError(id)
				substractLife()

				setTimeout(() => {
					setOptionError(null)
					setSelected(null)
				}, 800)
			}
		}
	}

	if (!options) return <></>

	return (
		<div className="mt-20">
			{data?.game_mode && (
				<div id="sentence" className="text-xl text-center">
					{sentence}
				</div>
			)}

			<div className="flex gap-x-4 justify-center mt-12">
				{options.map((e: translationType) => (
					<Button
						key={`translation-${e.id}`}
						color={optionError !== e.id ? 'primary' : 'danger'}
						size="md"
						variant={
							!selected ? 'solid' : selected !== e.id ? 'light' : 'solid'
						}
						onClick={() => selectOption(e.id)}
						isDisabled={selected}
						className={`${selected == e.id ? 'opacity-50' : ''}`}
					>
						{e.word}
					</Button>
				))}
			</div>
		</div>
	)
}
