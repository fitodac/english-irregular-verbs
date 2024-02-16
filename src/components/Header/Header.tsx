import { getSettings, getGame } from '@/actions'
import { HeaderLives, HeaderCoins, HeaderCart } from '.'
import { cookies } from 'next/headers'
import { Chip } from '@nextui-org/react'

export const Header = async (): Promise<JSX.Element> => {
	const cookieGame = cookies().get('irregularVerbsGame') as
		| RequestCookie
		| undefined
	const game = (await getGame(Number(cookieGame?.value))) as currentGameType
	const { stage } = (await getSettings()) as { stage: number }

	return (
		<aside className="py-3">
			<div className="flex justify-between items-center">
				<div>
					{cookieGame && stage && (
						<div className="text-sm font-medium flex gap-x-2 items-center">
							<span>Stage {stage}</span>
							<Chip color="primary" size="sm">
								{game?.game.name}
							</Chip>
						</div>
					)}
				</div>
				<div className="flex items-center gap-x-4">
					<HeaderLives />
					<HeaderCoins />

					{!cookieGame && <HeaderCart />}
				</div>
			</div>
		</aside>
	)
}
