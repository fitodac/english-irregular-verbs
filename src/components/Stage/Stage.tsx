import { GameList } from '.'
import { nextStage, getSettings, getStage } from '@/actions'

export const Stage = async (): Promise<JSX.Element> => {
	const settings = (await getSettings()) as { stage: number }
	const fullStage = (await getStage(settings.stage)) as stageScreenType
	const { stage, games } = fullStage

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
