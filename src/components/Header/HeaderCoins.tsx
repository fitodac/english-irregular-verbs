import { getSettings } from '@/actions'

export const HeaderCoins = async () => {
	const { coins } = (await getSettings()) as settingsType

	return (
		<div className="flex items-center gap-x-1">
			<i className="text-yellow-500 ri-money-dollar-circle-fill text-2xl" />
			<span className="text-xl">{coins}</span>
		</div>
	)
}
