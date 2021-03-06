import React, { useState, useEffect } from "react";
import "./Sidebar.scss";
import { FaCog, FaPlusSquare, FaBell, FaBellSlash } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { ServiceAccount } from "../../Entities/ServiceTypes";
import AddServiceModal from "../AddServiceModal";
import OptionsModal from "../OptionsModal";
import ReactTooltip from "react-tooltip";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Button from "react-bootstrap/Button";
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface SidebarProps {
  myservices: ServiceAccount[];
  selectService: (service: ServiceAccount) => void;
  addService: (service: ServiceAccount) => void;
  removeService: (service: ServiceAccount) => void;
  reorderService: (service: ServiceAccount, newIndex: number) => void;
}

interface IconButton {
  icon: IconType;
  action: Function;
  id: string;
  tooltip: string;
}

const Sidebar = (props: SidebarProps) => {
  const [showAddServiceModal, setShowAddServiceModal] = useState(
    props.myservices?.length === 0
  ); //When services empty, show AddServiceModal
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    value: true,
    icon: FaBell,
  });
  const [currentlySelected, setCurrentlySelected] = useState(
    props.myservices[0]
  );

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  useEffect(() => {
    props.myservices.map((s: ServiceAccount, i: number) => ({
      orderIndex: i,
      ...s,
    }));
  }, [props.myservices]);

  const getActionButtons = (): IconButton[] => {
    return [
      {
        icon: notificationsEnabled.icon,
        action: () =>
          setNotificationsEnabled({
            value: !notificationsEnabled.value,
            icon: !notificationsEnabled.value ? FaBell : FaBellSlash,
          }),
        id: "bell",
        tooltip: "Disable or Enable Notifications",
      },
      {
        icon: FaPlusSquare,
        action: () => {
          setShowAddServiceModal(true);
        },
        id: "plus",
        tooltip: "Add new Service",
      },
      {
        icon: FaCog,
        action: () => {
          setShowOptionsModal(true);
        },
        id: "cog",
        tooltip: "Options",
      },
    ] as IconButton[];
  };

  const getSidebarIconButtons = ({ icon, action, id, tooltip }: IconButton) => {
    return (
      <div
        data-tip={tooltip}
        className="square-button"
        id={id}
        key={id}
        onClick={() => action()}
      >
        <span>
          {React.createElement(icon, {
            className: "icon",
          })}
        </span>
      </div>
    );
  };

  const imageSize = "40px";

  const getServiceButtons = () => {
    return props.myservices
      .sort((a, b) => (a.orderIndex ?? -1) - (b.orderIndex ?? -1))
      .map((s: ServiceAccount, index: number) => (
        <Draggable key={s.id} draggableId={s.id} index={s.orderIndex ?? -1}>
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                key={s.id}
              >
                <div
                  data-tip={s.name}
                  className={`square-button${
                    s === currentlySelected ? " selected" : ""
                  }`}
                  onClick={() => selectService(s)}
                >
                  <ContextMenuTrigger
                    key={s.id + "trigger"}
                    id={s.id ?? s.name}
                    collect={() => s}
                  >
                    <div
                      className={`button-border${
                        s === currentlySelected ? " button-border-selected" : ""
                      }`}
                    ></div>

                    <img
                      src={s.type.icon?.toString()}
                      alt="icon"
                      width={imageSize}
                      height={imageSize}
                    />
                  </ContextMenuTrigger>
                </div>
                <ContextMenu key={s.id + "menu"} id={s.id ?? s.name}>
                  <MenuItem
                    onClick={(e, s: ServiceAccount) => props.removeService(s)}
                  >
                    <div>
                      <Button variant="danger">Remove</Button>
                    </div>
                  </MenuItem>
                </ContextMenu>
              </div>
            );
          }}
        </Draggable>
      ));
  };

  const selectService = (service: ServiceAccount) => {
    setCurrentlySelected(service);
    props.selectService(service);
  };

  const onDragged = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index) //same position
    ) {
      return;
    }

    console.log("Source Index", source.index);
    console.log("Destination Index", destination.index);

    const serv = props.myservices.find((s) => s.id === draggableId);

    if (serv === undefined) console.error("Service is undefined");

    props.reorderService(serv as ServiceAccount, destination.index);
  };

  return (
    <div className="sidebar">
      <DragDropContext onDragEnd={onDragged}>
        <Droppable droppableId="service-sidebar">
          {(provided) => {
            return (
              <div
                className="service-buttons"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {getServiceButtons()}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>

      <div className="bottom-buttons">
        {getActionButtons().map((i) => getSidebarIconButtons(i))}
      </div>

      <OptionsModal
        show={showOptionsModal}
        onHide={() => setShowOptionsModal(false)}
      />

      <AddServiceModal
        show={showAddServiceModal}
        onHide={() => setShowAddServiceModal(false)}
        addService={(service: ServiceAccount) => {
          props.addService(service);
          ReactTooltip.rebuild();
        }}
      />

      <ReactTooltip effect="solid" />
    </div>
  );
};

export default Sidebar;
