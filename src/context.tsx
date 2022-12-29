import React, { useState, useContext } from "react";
import sublinks from "./data";
import { AppContextType, LinksType, LocationType } from "./types";

const AppContext = React.createContext<AppContextType | null>(null);

type AppProviderProps = {
  children: React.ReactNode;
};
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);
  //state for nav page button location
  const [location, setLocation] = useState<LocationType>({
    center: 0,
    bottom: 0,
  });
  //   state for nav page button links based on hovered page name
  const [links, setLinks] = useState<LinksType[]>([]);
  //SIDEBAR
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  //MODAL
  const openSubmenu = (text: string | null, coords: LocationType) => {
    // every time we open submenu set coordinates for submenu
    setLocation(coords);
    // get links of hovered page button based on passed text argument
    const targetLinks = sublinks.filter((item) => {
      // check if passed text argument matches with page name an array then return this object
      return item.page === text;
    });
    // then get links from filtered array and set to state
    console.log(targetLinks[0].links);
    setLinks(targetLinks[0].links);
    setIsSubmenuOpen(true);
  };
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };
  return (
    <AppContext.Provider
      value={{
        isSubmenuOpen,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        openSubmenu,
        closeSubmenu,
        location,
        links,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//global hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};
