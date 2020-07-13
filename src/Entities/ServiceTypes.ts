import { IconType } from "react-icons/lib";

export interface ServiceType {
	serviceName: string;
	icon: IconType | undefined | string;
	category: string | undefined;
	url?: string;
}

export interface ServiceAccount {
	id?: number;
	name: string;
	type: ServiceType;
}
