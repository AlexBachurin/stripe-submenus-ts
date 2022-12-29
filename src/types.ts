export type AppContextType = {
  isSubmenuOpen: boolean;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  openSubmenu: (text: string | null, coords: LocationType) => void;
  closeSubmenu: () => void;
  location: LocationType;
  links: LinksType[];
};

export type LocationType = {
  center: number;
  bottom: number;
};

export type LinksType = {
  label: string;
  icon: JSX.Element;
  url: string;
};
