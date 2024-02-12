'use client'
import { useEffect, useState } from 'react'
import { clearCookies } from '@/actions'

export const GameCleared = () => {
	const [init, setInit] = useState(false)

	useEffect(() => {
		// Clear cookies
		setTimeout(() => {
			console.log('GameCleared')
			clearCookies()
		}, 2000)
	}, [])

	return (
		<>
			<div className="h-1/2 flex items-center justify-center">
				<div className="space-y-5">
					<img src="congrats.svg" alt="" className="w-32 mx-auto" />
					<div className="text-2xl">Game cleared</div>
				</div>
			</div>
		</>
	)
}
