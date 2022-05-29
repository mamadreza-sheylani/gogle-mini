import React from "react";
import { Link } from "react-router-dom";
import Footer from "./footer";
import Search from "./search";
const Navbar = ({ setDarkTheme, darkTheme }) => {
  return (
    <div className="p-5 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200">
      <div className="flex justify-between items-center space-x-5 w-screen">
        <Link to="/">
          <p className="text-xl text-black dark:text-gray-200">
            Google mini &#x1F50E;
          </p>
        </Link>
        <button
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
          className="ring-1 ring-gray-600 dark:ring-gray-200 text-black dark:text-gray-200 rounded-xl px-3 py-2 hover:bg-gray-200 hover:dark:bg-gray-600"
        >
          {darkTheme ? <p>Light &#128161;</p> : <p>Dark &#128161;</p>}
        </button>
      </div>
      <Search />
    </div>
  );
};

export default Navbar;
