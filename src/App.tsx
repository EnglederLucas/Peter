import React, { useState } from "react";
import "./App.css";
import Service from "./components/Service";
import Sidebar from "./components/Sidebar/Sidebar";
import { ServiceAccount } from "./Entities/ServiceTypes";
import { AvailableService } from "./AvailableServices";
// const electron = window.require("electron");
import { BrowserWindow } from "electron";

function App() {
	const myServices: ServiceAccount[] = [
		{ id: 1, name: "Lucas Mail", type: AvailableService.GMAIL.value },
		{ id: 2, name: "Lucas' WA", type: AvailableService.WHATTSAPP.value },
		{ id: 3, name: "4AHIF Slack", type: AvailableService.SLACK.value },
	];

	const [services, setServices] = useState(myServices);

	const [currentService, setCurentServices] = useState(services[0]);

	const selectService = (service: ServiceAccount) => {
		setCurentServices(service);
	};

	const addService = (service: ServiceAccount) => {
		setServices([...myServices, service]);
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
				{myServices.map((serv) => (
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
