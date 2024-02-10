import { Header, Stage, PlayGround } from '@/components'
import { cookies } from 'next/headers'
import { env } from '@/config'

export default async function Home() {
	// const reset = await fetch(`${env.API_PATH}/game/reset`)
	// console.log('reset:', reset)

	const game = cookies().has('irregularVerbsGame')

	return (
		<main className="max-w-sm mx-auto px-6">
			<Header />
			<div className="h-6"></div>
			{!game ? <Stage /> : <PlayGround />}
		</main>
	)
}
