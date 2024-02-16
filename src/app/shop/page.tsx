import { Header } from '@/components'
import { BuyLife } from './components/BuyLife'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { getSettings } from '@/actions'

export default async function Shop(): Promise<JSX.Element> {
	const settings = (await getSettings()) as settingsType
	const coins: number = parseInt(settings?.coins)

	return (
		<>
			<Header />

			<div className="h-6"></div>

			<div className="bg-slate-950 p-6 space-y-4 rounded-xl">
				{coins >= 5 ? (
					<>
						<p className="font-semibold text-center">Buy 1 life for 5 coins</p>
						<BuyLife />
					</>
				) : (
					<div className="">You don't have enough coins</div>
				)}
			</div>

			<div className="px-6 py-3 inset-x-0 bottom-0 fixed">
				<Link href="/">
					<Button
						fullWidth
						color="secondary"
						variant="bordered"
						size="lg"
						startContent={<i className="ri-arrow-left-s-line" />}
					>
						Back to game
					</Button>
				</Link>
			</div>
		</>
	)
}
