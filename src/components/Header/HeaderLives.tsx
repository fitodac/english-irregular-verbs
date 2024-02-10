import { getSettings } from '@/actions'

export const HeaderLives = async () => {
	const { lives } = (await getSettings()) as settingsType
	const arr = Array.from({ length: parseInt(lives ?? '0') }, (_, i) => i + 1)

	return (
		<div className="flex gap-x-2">
			{parseInt(lives) < 4 ? (
				arr.map((e, i) => (
					<i
						className="text-red-700 ri-heart-fill text-2xl"
						key={`live-${i}`}
					/>
				))
			) : (
				<div className="flex gap-x-1">
					<i className="text-red-700 ri-heart-fill text-2xl" />
					<span className="text-xl">{lives}</span>
				</div>
			)}
		</div>
	)
}
