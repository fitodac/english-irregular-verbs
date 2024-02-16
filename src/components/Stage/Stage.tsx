import { GameList } from '.'
import { env } from '@/config'
import { nextStage } from '@/actions'

export const Stage = async (): Promise<JSX.Element> => {
	const getSettings = await fetch(`${env.API_PATH}/settings`)
	const {
		settings: { stage: stageID },
	} = await getSettings.json()

	const getStage = await fetch(`${env.API_PATH}/stage?id=${stageID}`)
	const { stage, games } = await getStage.json()

	const isStageCleared = games.filter(
		(e: { cleared: number }): boolean => e.cleared === 0
	)

	// Si todos los juegos han sido terminados, pasa al siguiente stage:
	if (!isStageCleared.length) nextStage()

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
