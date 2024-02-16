'use client'
import { Button } from '@nextui-org/react'
import { buyOneLife } from '@/actions'

export const BuyLife = (): JSX.Element => {
	const handleAction = async () => {
		await buyOneLife()
	}

	return (
		<>
			<Button
				color="secondary"
				size="lg"
				fullWidth
				className="font-medium"
				onClick={handleAction}
			>
				Buy now
			</Button>
		</>
	)
}
