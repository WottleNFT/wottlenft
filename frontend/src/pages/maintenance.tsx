import { IonCardTitle } from "@ionic/react";
import Image from 'next/image';
import backgroundSeascape from "../../public/assets/background-seascape.png";
import angryThermometer from "../../public/assets/angry-thermometer.png";
import corn from "../../public/assets/corn.png";

const Maintenance = () => {
  return (
		<div className="relative flex justify-center w-full h-auto min-h-full bg-primary-default">
			<div className="absolute inset-0 z-0 object-cover w-full h-full">
				<Image
					src={backgroundSeascape}
					alt="background seascape"
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div className="absolute bottom-0 left-0 z-0 hidden object-cover sm:block" style={{height: "500px", width: "400px"}}>
				<Image
					src={angryThermometer}
					alt="angry thermometer"
					layout="fill"
				/>
			</div>
			<div className="absolute bottom-0 right-0 z-0 hidden object-cover h-1/3 lg:h-3/5 xl:h-4/5 sm:block" style={{height: "500px", width: "400px"}}>
				<Image
					src={corn}
					alt="corn"
					layout="fill"
				/>
			</div>
			<div className="z-10 flex flex-col w-5/6 h-screen py-32 text-center md:w-1/2" style={{height: "500px", width: "400px"}}>
				<IonCardTitle className="text-6xl font-bold">
					Under Maintenance
				</IonCardTitle>
				<p className="py-5 text-xl">
					WottleNFT will be back online soon. We apologise for the inconvenience caused. We are almost done!
				</p>
			</div>
		</div>
  );
};
export default Maintenance;