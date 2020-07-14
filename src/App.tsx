import React, { useState } from "react";
import "./App.css";
import Service from "./components/Service";
import Sidebar from "./components/Sidebar/Sidebar";
import { ServiceAccount } from "./Entities/ServiceTypes";
import { AvailableService } from "./AvailableServices";
import uuid from "uuid-random";

function App() {
	const myServices: ServiceAccount[] = [
		{ id: uuid(), name: "Lucas Mail", type: AvailableService.GMAIL.value },
		{
			id: uuid(),
			name: "Lucas' WA",
			type: AvailableService.WHATTSAPP.value,
		},
		{ id: uuid(), name: "4AHIF Slack", type: AvailableService.SLACK.value },
	];

	const [services, setServices] = useState(myServices);

	const [currentService, setCurentServices] = useState(services[0]);

	const selectService = (service: ServiceAccount) => {
		setCurentServices(service);
	};

	const addService = (service: ServiceAccount) => {
		setServices([...services, service]);
	};

	return (
		<div className="App">
			<Sidebar
				myservices={services}
				selectService={selectService}
				addService={(service: ServiceAccount) => addService(service)}
			></Sidebar>
			<div
				className="content"
				style={{
					marginLeft: "75px",
					position: "relative",
					height: "100vh",
				}}
			>
				{services.map((serv) => (
					<Service
						display={serv.id === currentService.id}
						url={serv.type.url ?? ""}
						name={serv.name}
					></Service>
				))}
			</div>
		</div>
	);
}

export default App;
