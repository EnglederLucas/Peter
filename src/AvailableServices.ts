import { ServiceType } from "./Entities/ServiceTypes";

export class AvailableService {
	static readonly GMAIL = new AvailableService("Gmail", {
		serviceName: "Gmail",
		url: "https://mail.google.com/mail/u/0/#inbox",
		icon: "gmail.svg",
		category: undefined,
	});
	static readonly WHATTSAPP = new AvailableService("WhatsApp", {
		serviceName: "WhatsApp",
		url: "https://web.whatsapp.com/",
		icon: "whattsapp.svg",
		category: undefined,
	});
	static readonly GOOGLE_KEEP = new AvailableService("Google Keep", {
		serviceName: "Google Keep",
		url: "https://keep.google.com/",
		icon: undefined,
		category: undefined,
	});
	static readonly TRELLO = new AvailableService("Trello", {
		serviceName: "Trello",
		url: "https://trello.com/",
		icon: "trello.svg",
		category: undefined,
	});
	static readonly SLACK = new AvailableService("Slack", {
		serviceName: "Slack",
		url: "https://slack.com/intl/en-at/",
		icon: "slack.svg",
		category: undefined,
	});

	static readonly ALLSERVICES: AvailableService[] = [
		AvailableService.GMAIL,
		AvailableService.GOOGLE_KEEP,
		AvailableService.SLACK,
		AvailableService.WHATTSAPP,
		AvailableService.TRELLO,
	];

	// private to disallow creating other instances of this type
	private constructor(
		private readonly key: string,
		public readonly value: ServiceType
	) {}

	toString() {
		return this.key;
	}
}
