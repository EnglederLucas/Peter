import React, { useState, useEffect } from "react";
import Service from "./components/Service";
import Sidebar from "./components/Sidebar/Sidebar";
import { ServiceAccount } from "./Entities/ServiceTypes";

function App() {
  const [services, setServices] = useState<ServiceAccount[]>(getServicesLS());

  const [currentService, setCurrentServices] = useState<ServiceAccount | null>(
    null
  );
  const selectService = (service: ServiceAccount) => {
    setCurrentServices(service);
  };

  function getServicesLS() {
    console.log("GetLocalStorage", localStorage.getItem("services"));

    try {
      return JSON.parse(localStorage.getItem("services") ?? "") ?? [];
    } catch (error) {
      console.log(error);
    }

    return [];
  }

  function setServicesLS(services: ServiceAccount[]) {
    console.log("SetLocalStorage", localStorage.getItem("services"));

    try {
      localStorage.setItem("services", JSON.stringify(services));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("services")) {
      setServicesLS([]);
    }

    // console.log("salskdj", localStorage.getItem("services"));
  }, []);

  const addService = (service: ServiceAccount) => {
    // console.log("Local Storage Test", getServicesLS());
    // localStorage.setItem("services", JSON.stringify(i++));
    setServicesLS([...services, service]);
    setServices([...services, service]);
  };

  const removeService = (service: ServiceAccount) => {
    // console.log("Local Storage Test", localStorage.getItem("services"));
    console.log("App", service);
    setServices(services.filter((s) => s.id !== service.id));
    setServicesLS(services.filter((s) => s.id !== service.id));
  };

  return (
    <div className="App">
      {/* <h3>Joe</h3> */}
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
