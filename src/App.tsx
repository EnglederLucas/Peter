import React, { useState } from "react";
import Service from "./components/Service";
import Sidebar from "./components/Sidebar/Sidebar";
import { ServiceAccount } from "./Entities/ServiceTypes";
import { getAllServices } from "./AvailableServices";
import uuid from "uuid-random";

function App() {
  const [services, setServices] = useState<ServiceAccount[]>([]);

  const [currentService, setCurentServices] = useState<ServiceAccount | null>(
    null
  );

  const selectService = (service: ServiceAccount) => {
    setCurentServices(service);
  };

  const addService = (service: ServiceAccount) => {
    console.log(service);
    setServices([...services, service]);
  };

  const removeService = (service: ServiceAccount) => {
    console.log("App", service);
    setServices(services.filter((s) => s.id !== service.id));
  };

  return (
    <div className="App">
      <Sidebar
        myservices={services}
        selectService={selectService}
        addService={(service: ServiceAccount) => addService(service)}
        removeService={(service: ServiceAccount) => removeService(service)}
      ></Sidebar>
      <div
        className="content"
        style={{
          marginLeft: "75px",
          position: "relative",
          height: "100vh",
        }}
      >
        {services.map((serv) => {
          console.log(serv);
          return (
            <Service
              display={serv.id === currentService?.id}
              url={serv.type.url ?? ""}
              name={serv.name}
              key={serv.id}
            ></Service>
          );
        })}
      </div>
    </div>
  );
}

export default App;
