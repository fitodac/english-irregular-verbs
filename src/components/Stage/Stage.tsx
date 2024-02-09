import { getStage, getSettings, settingsType } from '@/actions'
import { GameList } from '.'

export const Stage = async () => {
	const { stage: stageID } = (await getSettings()) as settingsType
	const { stage, games } = (await getStage(
		parseInt(stageID)
	)) as stageScreenType

	return (
		<>
			<section className="">
				<div className="text-xl font-semibold text-center">
					Stage {stage.idx}
				</div>

				<GameList games={games} />
			</section>

			{/* <pre>{JSON.stringify(games, null, 2)}</pre> */}
		</>
	)
}
