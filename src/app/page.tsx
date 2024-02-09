import { gameReset } from '@/actions'
import { Header, Stage, PlayGround } from '@/components'
import { cookies } from 'next/headers'

export default async function Home() {
	// await gameReset()
	const game = cookies().has('irregularVerbsGame')

	return (
		<main className="max-w-sm mx-auto px-6">
			<Header />
			<div className="h-6"></div>
			{!game ? <Stage /> : <PlayGround />}
		</main>
	)
}
