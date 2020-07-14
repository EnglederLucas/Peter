import { IconType } from "react-icons/lib";

export interface ServiceType {
	serviceName: string;
	icon: IconType | undefined | string;
	category?: string;
	url?: string;
}

export interface ServiceAccount {
	id?: string;
	name: string;
	type: ServiceType;
}
