import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";

import uuid from "uuid-random";

import Dropdown from "react-bootstrap/Dropdown";
import { AvailableService } from "./../AvailableServices";
import { ServiceAccount, ServiceType } from "./../Entities/ServiceTypes";
import Service from "./Service";

interface AddServiceModalProp {
	show: boolean;
	onHide: any;
	addService: (s: ServiceAccount) => void;
}

const AddServiceModal = (props: AddServiceModalProp) => {
	const [service, setService] = useState((null as unknown) as ServiceType);
	const [name, setName] = useState("");

	const getSlackCustomURL = () => {
		return (
			<InputGroup>
				<InputGroup.Prepend>
					<InputGroup.Text id="basic-addon2">
						https://
					</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					placeholder="Custom URL"
					aria-label="Custom URL"
					onChange={(name) => {
						console.log(name);
						setService({
							serviceName: service.serviceName,
							icon: service.icon,
							category: service.category,
							url:
								"https://" + name.target.value + ".slack.com" ??
								service.url,
						});
					}}
				/>
				<InputGroup.Append>
					<InputGroup.Text id="basic-addon2">
						.slack.com
					</InputGroup.Text>
				</InputGroup.Append>
			</InputGroup>
		);
	};

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Add Service
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<InputGroup className="mb-3">
					<FormControl
						className="mr-1"
						placeholder="Service Name"
						aria-label="Service Name"
						defaultValue={service?.serviceName ?? ""}
						// onChange={name => {
						//     console.log(name);
						//     setName(name.target.textContent?.toString() setName(?? "");
						// }}
						onChange={(e) => setName(e.target.value)}
					/>
					<DropdownButton
						id="dropdown-basic-button"
						title="Type of Service"
					>
						{AvailableService.ALLSERVICES.map((service) => (
							<Dropdown.Item
								href="#/action-1"
								onSelect={() => {
									console.log(service.value);
									setService(service.value);
								}}
							>
								{service.toString()}
							</Dropdown.Item>
						))}
					</DropdownButton>
				</InputGroup>

				{service !== null &&
					service.serviceName ===
						AvailableService.SLACK.value.serviceName &&
					getSlackCustomURL()}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
				<Button
					variant="success"
					onClick={() => {
						props.onHide();
						if (service !== undefined && service !== null) {
							props.addService({
								name: name,
								type: service,
								id: uuid(),
							});

							setName("");
							setService((null as unknown) as ServiceType);
						}
					}}
				>
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default AddServiceModal;
