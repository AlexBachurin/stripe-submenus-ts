import React from "react";
import logo from "./images/logo.svg";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";
import { AppContextType } from "./types";

const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu } =
    useGlobalContext() as AppContextType;

  const displaySubmenu: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLElement;
    console.log(target.textContent);
    // get name of hovered nav page button
    const pageName = target.textContent;
    // get location of hovered nav page button
    const pageButton = target.getBoundingClientRect();
    // center of button
    const center = (pageButton.left + pageButton.right) / 2;
    // bottom of button, do -3 because we wanna hide submenu when we exit button space
    const bottom = pageButton.bottom - 3;
    openSubmenu(pageName, { center, bottom });
  };

  // closeSubmenu on Mouse over
  const handleSubmenu: React.MouseEventHandler<HTMLElement> = (e) => {
    const target = e.target as HTMLElement;
    // if target which we mouse over at the moment doesnt have class of link-btn then close submenu
    if (!target.classList.contains("link-btn")) {
      closeSubmenu();
    }
  };
  return (
    <nav className="nav" onMouseOver={handleSubmenu}>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="stripe" className="nav-logo" />
          <button className="btn toggle-btn" onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          <li>
            <button onMouseOver={displaySubmenu} className="link-btn">
              products
            </button>
          </li>
          <li>
            <button onMouseOver={displaySubmenu} className="link-btn">
              developers
            </button>
          </li>
          <li>
            <button onMouseOver={displaySubmenu} className="link-btn">
              company
            </button>
          </li>
        </ul>
        <button className="btn signin-btn">Sign In</button>
      </div>
    </nav>
  );
};

export default Navbar;
