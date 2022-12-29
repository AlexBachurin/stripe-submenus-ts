import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "./context";
import { AppContextType } from "./types";

const Submenu = () => {
  const { isSubmenuOpen, location, links } =
    useGlobalContext() as AppContextType;
  // state to dynamically change css based on how many links we have
  const [columns, setColumns] = useState("col-2");

  const container = useRef<HTMLElement>(null);
  // every time location changes call useEffect to rerender submenu in new place
  useEffect(() => {
    // reset to default to avoid bugs
    setColumns("col-2");
    const submenu = container.current;
    // get location position
    const { center, bottom } = location;
    // change inline style
    if (submenu) {
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;
    }
    if (links.length === 3) {
      setColumns("col-3");
    }
    if (links.length > 3) {
      setColumns("col-4");
    }
  }, [location]);
  return (
    <aside
      ref={container}
      className={`${isSubmenuOpen ? "submenu show" : "submenu"}`}
    >
      <div className={`submenu-center ${columns}`}>
        {links.map((item) => {
          const { label, icon, url } = item;
          return (
            <a href={url}>
              {icon}
              {label}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default Submenu;
