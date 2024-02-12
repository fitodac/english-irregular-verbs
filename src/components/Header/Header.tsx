import { getSettings, getGame } from '@/actions'
import { HeaderLives, HeaderCoins, gameType } from '.'
import { cookies } from 'next/headers'
import { Chip } from '@nextui-org/react'

export const Header = async () => {
	const cookieGame = cookies().get('irregularVerbsGame') as
		| RequestCookie
		| undefined
	const game = (await getGame(Number(cookieGame?.value))) as gameType
	const { stage } = await getSettings()

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
				</div>
			</div>
		</aside>
	)
}
