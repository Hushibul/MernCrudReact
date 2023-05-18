import React from "react";
import { menu } from "../../assets/constants/constants";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <nav className="flex items-center bg-zinc-800 py-2">
      <Link className="ml-6" to={"/"}>
        <h2 className="text-xl text-white">Navbar</h2>
      </Link>

      <ul className="ml-12 items-center hidden lg:flex gap-4">
        {menu.map((item) => (
          <li key={item.id}>
            <Link
              className="text-white transition-all duration-150 hover:underline"
              to={item.path}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden sm:flex ml-auto gap-2 items-center">
        <input
          className="px-4 py-2 ml-6 rounded-lg"
          type="search"
          placeholder="Search Products"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="px-4 py-2 rounded bg-white text-slate-700">
          Search
        </button>
      </div>

      <Link
        to={"/login"}
        className="ml-auto sm:ml-2 px-4 py-2 rounded-md bg-white text-slate-800 mr-12"
      >
        Login
      </Link>
    </nav>
  );
};

export default NavBar;
