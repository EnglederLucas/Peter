// import { existsSync } from "fs"; Also tried to import this, no success
import React, { useState, useEffect } from "react";
import Service from "./components/Service";
import Sidebar from "./components/Sidebar/Sidebar";
import { ServiceAccount } from "./Entities/ServiceTypes";
import * as util from "util";

import lowdb from "lowdb";
import FileAsync from "lowdb/adapters/FileAsync";
const adapter = new FileAsync("db.json");
const db = lowdb(adapter);

// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");

// const adapter = new FileSync("db.json");
// const db = low(adapter);
// const electron = window.require("electron");

// const db = lowdb(adapter);
// // import * as storage from "electron-json-storage";
// const Store = require("electron-store");
// import Store from "electron-store";
// const store = new Store();

function App() {
  //   const [services, setServices] = useState<ServiceAccount[]>([]);

  //   const [currentService, setCurrentServices] = useState<ServiceAccount | null>(
  //     null
  //   );
  //   const selectService = (service: ServiceAccount) => {
  //     setCurrentServices(service);
  //   };

  //   async function getServicesLS() {
  //     console.log("GetLocalStorage", localStorage.getItem("services"));

  //     // const getStorage = util.promisify(storage.get);

  //     // console.log(await getStorage("services"));

  //     try {
  //       // return (await getStorage("services")) as ServiceAccount[];
  //       return store.get("services");
  //     } catch (error) {
  //       console.log(error);
  //     }

  //     return [];
  //   }

  //   function setServicesLS(services: ServiceAccount[]) {
  //     console.log("SetLocalStorage", localStorage.getItem("services"));

  //     // const setStorage = util.promisify(storage.set);

  //     try {
  //       // setStorage("services", services);
  //       return store.set("services", services);
  //       // localStorage.setItem("services", JSON.stringify(services));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  useEffect(() => {
    // if (localStorage.getItem("services")) {
    //   setServicesLS([]);
    // }
    // getServicesLS().then((data) => setServices(data));
    // console.log("salskdj", localStorage.getItem("services"));
    db.then((db) => {
      db.defaults({ services: [] }).write();
    });
  }, []);

  //   const addService = (service: ServiceAccount) => {
  //     // console.log("Local Storage Test", getServicesLS());
  //     // localStorage.setItem("services", JSON.stringify(i++));
  //     setServicesLS([...services, service]);
  //     setServices([...services, service]);
  //     // localStorage.setItem("services", JSON.stringify(services));
  //     // console.log(JSON.parse(localStorage.getItem("services") ?? "") ?? []);
  //   };

  //   const removeService = (service: ServiceAccount) => {
  //     // console.log("Local Storage Test", localStorage.getItem("services"));
  //     console.log("App", service);
  //     setServices(services.filter((s) => s.id !== service.id));
  //     setServicesLS(services.filter((s) => s.id !== service.id));
  //   };

  return (
    //   <div className="App">
    //     {/* <h3>Joe</h3> */}
    //     <Sidebar
    //       myservices={services}
    //       selectService={selectService}
    //       addService={(service: ServiceAccount) => addService(service)}
    //       removeService={(service: ServiceAccount) => removeService(service)}
    //     ></Sidebar>
    //     <div
    //       className="content"
    //       style={{
    //         marginLeft: "75px",
    //         position: "relative",
    //         height: "100vh",
    //       }}
    //     >
    //       {services.map((serv) => {
    //         console.log(serv);
    //         return (
    //           <Service
    //             display={serv.id === currentService?.id}
    //             url={serv.type.url ?? ""}
    //             name={serv.name}
    //             key={serv.id}
    //           ></Service>
    //         );
    //       })}
    //     </div>
    //   </div>
    <h2>Joe</h2>
  );
}

export default App;

// import React from "react";

// const App = () => {
//   return (
//     <div>
//       <h2>Joe</h2>
//     </div>
//   );
// };

// export default App;
