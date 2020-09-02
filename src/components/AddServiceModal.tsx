import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import uuid from "uuid-random";

import { getAllServices } from "./../AvailableServices";
import ServiceCarousel from "./Other Components/ServiceCarousel";
import { ServiceType, ServiceAccount } from "../Entities/ServiceTypes";

interface AddServiceModalProp {
  show: boolean;
  onHide: any;
  addService: (s: ServiceAccount) => void;
}

const AddServiceModal = (props: AddServiceModalProp) => {
  const [service, setService] = useState<ServiceType | null>(null);
  const [name, setName] = useState("");

  const getSlackCustomURL = () => {
    return (
      <InputGroup className="mt-10">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon2">https://</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Custom URL"
          aria-label="Custom URL"
          onChange={(name) => {
            console.log(name);
            setService({
              url: `https://"${name.target.value}.slack.com` ?? service?.url,
              ...service,
            } as ServiceType);
          }}
        />
        <InputGroup.Append>
          <InputGroup.Text id="basic-addon2">.slack.com</InputGroup.Text>
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
            onChange={(e) => setName(e.target.value)}
          />
          {/* <DropdownButton id="dropdown-basic-button" title="Type of Service">
            {getAllServices().map((service: ServiceType) => (
              <Dropdown.Item
                href="#/action-1"
                key={service.serviceName}
                onSelect={() => {
                  console.log(service);
                  setService(service);
                }}
              >
                {service.serviceName}
              </Dropdown.Item>
            ))}
          </DropdownButton> */}
        </InputGroup>

        <ServiceCarousel
          onSelect={(ser: ServiceType) => setService(ser)}
          services={getAllServices()}
        ></ServiceCarousel>

        {service !== null &&
          service.serviceName === "Slack" &&
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
