import React, { Component } from "react";
const Webview = require("react-electron-web-view");

type ServiceProps = {
	url: string;
	name: string;
	display: boolean;
};

type ServiceState = {};

class Service extends Component<ServiceProps, ServiceState> {
	render() {
		return (
			<>
				<Webview
					style={{
						display: this.props.display ? "inherit" : "none",
						width: "100%",
						height: "100%",
						border: "none",
					}}
					src={this.props.url}
					useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.128 Safari/537.36"
					partition="persist:service-c1e18515-1c36-46c9-bf6f-c2ae99cd28be"
					autosize="on"
				></Webview>
			</>
		);
	}
}

export default Service;
