'use client'
import { env } from '@/config'
import { Button } from '@nextui-org/react'
import { gameReset } from '@/actions'

export const GameOver = (): JSX.Element => {
	const restart = async () => {
		await gameReset()
	}

	return (
		<div className="h-full grid place-content-center">
			<div className="flex flex-col items-center gap-4 -mt-20">
				<img src="skull.svg" alt="skull" className="w-16" />
				<div className="text-white text-3xl font-bold text-center leading-none">
					<div>GAME</div>
					<div>OVER</div>
				</div>
			</div>

			<div className="mt-8">
				<Button color="secondary" size="lg" onClick={restart}>
					Play again?
				</Button>
			</div>
		</div>
	)
}
