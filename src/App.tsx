import React, { useState, useEffect } from "react";
import Service from "./components/Service";
import Sidebar from "./components/Sidebar/Sidebar";
import { ServiceAccount } from "./Entities/ServiceTypes";
import isElectron from "is-electron";
import { IpcRenderer } from "electron";

declare global {
  interface Window {
    require: (
      module: "electron"
    ) => {
      ipcRenderer: IpcRenderer;
    };
  }
}

const { ipcRenderer } = window.require("electron");

function App() {
  const [services, setServices] = useState<ServiceAccount[]>([]);

  const [currentService, setCurrentServices] = useState<ServiceAccount | null>(
    null
  );
  const selectService = (service: ServiceAccount) => {
    setCurrentServices(service);
  };

  function setServicesLS(services: ServiceAccount[]) {
    try {
      ipcRenderer.send("save-new-service", services);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isElectron()) {
      console.log(ipcRenderer);
      ipcRenderer.on("all-services", (event: any, arg: any) => {
        console.log("AllServices", arg);
        setServices(arg);
      });
      ipcRenderer.send("get-all-services");
    }
  }, []);

  const addService = (service: ServiceAccount) => {
    setServicesLS([...services, service]);
    setServices([...services, service]);
  };

  const removeService = (service: ServiceAccount) => {
    console.log("App", service);
    setServices(services.filter((s) => s.id !== service.id));
    setServicesLS(services.filter((s) => s.id !== service.id));
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
