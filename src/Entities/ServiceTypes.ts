import { IconType } from "react-icons/lib";

export interface ServiceType {
	serviceName: string;
	icon: IconType | undefined | string;
	tags?: string[];
	url?: string;
	groupBased?: boolean;
}

export interface ServiceAccount {
	id?: string;
	name: string;
	type: ServiceType;
}
