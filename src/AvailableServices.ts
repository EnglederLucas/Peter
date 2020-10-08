import { ServiceType } from "./Entities/ServiceTypes";
import services from "./services.json";

export function getAllServices(): ServiceType[] {
  const serviceTypes: ServiceType[] = services.map(
    (ser) =>
      ({
        ...ser,
        icon: "./serviceicons/" + ser.icon,
      } as ServiceType)
  );

  return serviceTypes;
}
