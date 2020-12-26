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
  const [services, setServices] = useState<ServiceAccount[]>(
    JSON.parse(localStorage.getItem("services") ?? "") ?? []
  );

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
      console.info(ipcRenderer);
      ipcRenderer.on("all-services", (event: any, arg: any) => {
        setServices(arg);
      });
      ipcRenderer.send("get-all-services");
    }
  }, []);

  const addService = (service: ServiceAccount) => {
    service = { orderIndex: services.length, ...service };

    setServicesLS([...services, service]);
    setServices([...services, service]);
    localStorage.setItem("services", JSON.stringify(services));
    console.log(JSON.parse(localStorage.getItem("services") ?? "") ?? []);
  };

  const removeService = (service: ServiceAccount) => {
    console.log("Remove");
    console.info("Removing Service", service);
    setServices(services.filter((s) => s.id !== service.id));
    setServicesLS(services.filter((s) => s.id !== service.id));
  };

  const reorderService = (service: ServiceAccount, newIndex: number) => {
    console.log("Service and Destination", service, newIndex);
    let servicesCopy = [...services];
    const insert = (arr: any[], index: number, newItem: ServiceAccount) => [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index),
    ];

    servicesCopy = servicesCopy
      .sort((a, b) => (a.orderIndex ?? -1) - (b.orderIndex ?? -1))
      .map((s, i) => ({ ...s, orderIndex: i }));

    servicesCopy = servicesCopy.filter((s) => s.id !== service.id);
    servicesCopy = insert(servicesCopy, newIndex, service);

    servicesCopy = servicesCopy
      .map((s, i) => ({ ...s, orderIndex: i }))
      .sort((a, b) => (a.orderIndex ?? -1) - (b.orderIndex ?? -1));

    setServices(servicesCopy);
    setServicesLS(servicesCopy);
  };

  return (
    <div className="App">
      <Sidebar
        myservices={services}
        selectService={selectService}
        addService={(service: ServiceAccount) => addService(service)}
        removeService={(service: ServiceAccount) => removeService(service)}
        reorderService={(service: ServiceAccount, newIndex: number) =>
          reorderService(service, newIndex)
        }
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
          return (
            <Service
              display={serv.id === currentService?.id}
              service={serv}
              key={serv.id}
            ></Service>
          );
        })}
      </div>
    </div>
  );
}

export default App;
