import { Activity, ActivityStatus } from "../../types/Activity";

interface Props {
  activity: Activity;
}

const ActivityCard = ({ activity }: Props) => {
  return (
    <div
      style={{ height: 450, width: 350 }}
      className="flex flex-col m-8 transition-all rounded-2xl bg-gray-50 drop-shadow-md hover:drop-shadow-2xl hover:scale-110"
    >
      <div className="h-4/6">
        <img
          className="object-contain w-full h-full pt-2"
          alt="Activity image"
          src={activity.image}
        />
      </div>
      <div className="flex flex-col py-2 text-center">
        <p className="text-lg font-bold">Name</p>
        <p>description</p>
      </div>
      <div
        className={`flex items-center flex-grow rounded-b-2xl ${
          activity.status === ActivityStatus.listed ||
          activity.status === ActivityStatus.bought
            ? "bg-black"
            : "bg-red-500"
        }`}
      >
        <p className="w-full text-3xl font-bold text-center text-white">
          {activity.status}
        </p>
      </div>
    </div>
  );
};
export default ActivityCard;
