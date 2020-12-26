import React, { CSSProperties, useState } from "react";
import { ServiceType } from "./../../Entities/ServiceTypes";
import ReactTooltip from "react-tooltip";
import "./../../default-styles.scss";

export default function ServiceCarousel({
  services,
  onSelect,
}: {
  services: ServiceType[];
  onSelect: (serviceType: ServiceType) => void;
}) {
  const imageSize = "75px";
  const [selected, setSelected] = useState<ServiceType | null>(null);

  return (
    <div style={container}>
      {services.map((s) => (
        <div
          style={serviceContainer}
          key={s.serviceName}
          data-tip={s.serviceName}
          className={`onhover-icon ${
            selected?.serviceName === s.serviceName ? "selected" : ""
          }`}
          onClick={() => {
            setSelected(s);
            onSelect(s);
          }}
        >
          <img
            style={imgStyle}
            height={imageSize}
            width={imageSize}
            src={s.icon?.toString()}
            alt="icon"
          />
        </div>
      ))}
      <ReactTooltip effect="solid" place="bottom" />
    </div>
  );
}

const container: CSSProperties = {
  width: "100%",
  display: "grid",
  // flexDirection: "row",
  gridTemplateColumns: "repeat(auto-fit, minmax(125px, 1fr))",
  gridGap: "10px",
  // overflowX: "scroll",
  overflowY: "scroll",
  height: "300px",
};

const serviceContainer = {
  //   width: "50px",
  //   height: "50px",
  // margin: "0 10px 10px 0",
  padding: "20px",
  backgroundColor: "rgba(163, 188, 209, 0.2)",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
};

const imgStyle: CSSProperties = {
  // margin: "auto 0",
};
