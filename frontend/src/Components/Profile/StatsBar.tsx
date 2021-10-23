interface Props {
	collection: number;
	activity: number;
	contribution: number;
}

const StatsBar = (props: Props) => {
	return (
		<div className="self-end my-5">
			<div className="flex">
				<div className="font-bold">
					<p className="px-5 text-xl text-center border-r-2 border-black border-solid">Collection</p>
					<p className="text-3xl text-center">{props.collection}</p>
				</div>
				<div className="font-bold">
					<p className="px-5 text-xl text-center border-r-2 border-black border-solid">Activity</p>
					<p className="text-3xl text-center">{props.activity}</p>
				</div>
				<div className="font-bold">
					<p className="px-5 text-xl text-center">Contribution</p>
					<p className="text-3xl text-center">{props.contribution}</p>
				</div>
			</div>
		</div>
	);
}
export default StatsBar