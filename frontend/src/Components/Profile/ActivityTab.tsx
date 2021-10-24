import { Activity, ActivityStatus } from "../../types/Activity";
import ActivityCard from "./ActivityCard";

const activities: Activity[] = [{
	author: "Author",
	image: "https://picsum.photos/300",
	status: ActivityStatus.bought,
}, {
	author: "Creator",
	image: "https://picsum.photos/400",
	status: ActivityStatus.delisted,
}]

const ActivityTab = () => {
	return (
		<div className="flex flex-wrap justify-center">
			{activities.map(activityData => 
				<ActivityCard activity={activityData} />
			)}
		</div>
	);
}
export default ActivityTab