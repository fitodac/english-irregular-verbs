import { GameList } from '.'
import { env } from '@/config'

export const Stage = async () => {
	const getSettings = await fetch(`${env.API_PATH}/settings`)
	const {
		settings: { stage: stageID },
	} = await getSettings.json()

	const getStage = await fetch(`${env.API_PATH}/stage?id=${stageID}`)
	const { stage, games } = await getStage.json()

	return (
		<>
			<section className="">
				<div className="text-xl font-semibold text-center">
					Stage {stage.idx}
				</div>

				<GameList games={games} />
			</section>
		</>
	)
}
