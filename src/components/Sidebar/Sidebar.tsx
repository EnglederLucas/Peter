import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { FaCog, FaPlusSquare, FaBell, FaBellSlash } from "react-icons/fa";
import {
	BsPlusSquareFill,
	BsBellFill,
	BsFillExclamationCircleFill,
} from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { ServiceAccount } from "../../Entities/ServiceTypes";
import AddServiceModal from "../AddServiceModal";
import OptionsModal from "../OptionsModal";
import ReactTooltip from "react-tooltip";

interface SidebarProps {
	myservices: ServiceAccount[];
	selectService: (service: ServiceAccount) => void;
	addService: (service: ServiceAccount) => void;
}

interface IconButton {
	icon: IconType;
	action: Function;
	id: string;
	tooltip: string;
}

const Sidebar = (props: SidebarProps) => {
	const [showAddServiceModal, setShowAddServiceModal] = useState(false);
	const [showOptionsModal, setShowOptionsModal] = useState(false);
	const [notificationsEnabled, setNotificationsEnabled] = useState({
		value: true,
		icon: FaBell,
	});

	const getActionButtons = (): IconButton[] => {
		return [
			{
				icon: notificationsEnabled.icon,
				action: () =>
					setNotificationsEnabled({
						value: !notificationsEnabled.value,
						icon: !notificationsEnabled.value
							? FaBell
							: FaBellSlash,
					}),
				id: "bell",
				tooltip: "Disable or Enable Notifications",
			},
			{
				icon: FaPlusSquare,
				action: () => {
					setShowAddServiceModal(true);
				},
				id: "plus",
				tooltip: "Add new Service",
			},
			{
				icon: FaCog,
				action: () => {
					setShowOptionsModal(true);
				},
				id: "cog",
				tooltip: "Options",
			},
		] as IconButton[];
	};

	const [currentlySelected, setCurrentlySelected] = useState(
		props.myservices[0]
	);

	const getSidebarIconButtons = ({
		icon,
		action,
		id,
		tooltip,
	}: IconButton) => {
		return (
			<div
				data-tip={tooltip}
				className="square-button"
				id={id}
				onClick={() => action()}
			>
				<span>
					{React.createElement(icon, {
						className: "icon",
					})}
				</span>
			</div>
		);
	};

	const getServiceButtons = () => {
		return props.myservices.map((s: ServiceAccount) => (
			<div
				data-tip={s.name}
				className={`square-button${
					s === currentlySelected ? " selected" : ""
				}`}
				onClick={() => selectService(s)}
			>
				<div
					className={`button-border${
						s === currentlySelected ? " button-border-selected" : ""
					}`}
				></div>
				{/* <p
                    style={{
                        cursor: "pointer",
                        border: "none",
                        fontSize: "1.1em",
                        letterSpacing: "0.1px",
                        lineHeight: "1.3em",
                        fontFamily: "Segoe UI",
                    }}>
                    {s.name}
                </p> */}
				<img src={s.type.icon?.toString()} alt="icon" />
			</div>
		));
	};

	const selectService = (service: ServiceAccount) => {
		setCurrentlySelected(service);
		props.selectService(service);
	};

	return (
		<div className="sidebar">
			<div className="service-buttons">{getServiceButtons()}</div>
			<div className="bottom-buttons">
				{getActionButtons().map((i) => getSidebarIconButtons(i))}
			</div>

			<OptionsModal
				show={showOptionsModal}
				onHide={() => setShowOptionsModal(false)}
			/>

			<AddServiceModal
				show={showAddServiceModal}
				onHide={() => setShowAddServiceModal(false)}
				addService={(service: ServiceAccount) =>
					props.addService(service)
				}
			/>

			<ReactTooltip effect="solid" />
		</div>
	);
};

export default Sidebar;
