'use client'

import { addLife, substractLife } from '@/actions'
import { Button } from '@nextui-org/react'

export const Buttons = () => {
	const addOneLife = async () => {
		await addLife()
	}

	const substractOneLife = async () => {
		await substractLife()
	}

	return (
		<>
			<Button onClick={substractOneLife}>Life -1</Button>
			<Button onClick={addOneLife}>Life +1</Button>
		</>
	)
}
