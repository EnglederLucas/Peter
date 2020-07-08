import React, { Component } from "react";

type ServiceProps = {
    url: string;
    name: string;
};

type ServiceState = {};

class Service extends Component<ServiceProps, ServiceState> {
    render() {
        return (
            <>
                <iframe
                    style={{ width: "100%", height: "100%", border: "none" }}
                    src={this.props.url}></iframe>
            </>
        );
    }
}

export default Service;
