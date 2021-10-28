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
      <div className="flex items-center my-2 h-14">
        <div className="w-12 h-12 mx-3 bg-gray-300 rounded-full"></div>
        <p className="font-bold">@{activity.author}</p>
      </div>
      <div className="w-full mb-3 h-3/5">
        <img
          className="object-contain h-full p-2 mx-auto object-fit rounded-3xl"
          alt="Activity image"
          src={activity.image}
        />
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
