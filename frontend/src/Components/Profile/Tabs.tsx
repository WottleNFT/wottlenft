import { useState } from "react";

enum Tab {
	Collection,
	Activity,
	Contribution
}

const Tabs = () => {
	const [activeTab, setActiveTab] = useState<number>(Tab.Contribution)

	return(
		<div className="self-start my-20 ml-6">
			<div className="flex">
					<button className={`px-5 text-2xl font-bold text-center border-r-2 border-black border-solid hover:text-primary-default ${activeTab === Tab.Collection && "text-primary-default"}`}>Collection</button>
					<button className={`px-5 text-2xl font-bold text-center border-r-2 border-black border-solid hover:text-primary-default ${activeTab === Tab.Activity && "text-primary-default"}`}>Activity</button>
					<button className={`px-5 text-2xl font-bold text-center hover:text-primary-default ${activeTab === Tab.Contribution && "text-primary-default"}`}>Contribution</button>
			</div>
		</div>
	);
}
export default Tabs