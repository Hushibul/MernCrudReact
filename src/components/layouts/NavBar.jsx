import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import { menu } from "../../assets/constants/constants";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { storedUserData, logOut } = useAuth();

  return (
    <>
      <div className="text-center text-md text-wheat py-2 bg-darkNavy">20% OFF in All Products</div>
      <div className="flex mt-3 items-center justify-between py-2 px-6 lg:px-28">
      <Link to={"/"}>
        <h2 className="text-xl font-bold">Navbar</h2>
      </Link>

      <div className="hidden ml-20 sm:flex w-2/5 rounded-3xl px-6 bg-darkNavy gap-2 items-center">
        <input
          className="py-3 w-full bg-darkNavy rounded-lg focus-within:outline-none"
          type="search"
          placeholder="Search Products"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button>
          <HiOutlineSearch className="text-white text-lg" />
        </button>
      </div>

      <div className="">
        <h2 className="text-lg text-wheat text-right">Call Us for Free!</h2>
        <h2 className="text-2xl font-bold text-wheat text-right">+88 37287382</h2>
      </div>

      
    </div>

    <nav className="px-28 flex items-center justify-between mt-6">
      <ul className="items-center hidden lg:flex gap-4">
        {menu.map((item) => (
          <li key={item.id}>
            <Link
              className="text-white text-md font-semibold transition-all duration-150 hover:underline"
              to={item.path}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {storedUserData === null ? (
        <Link
          to={"/login"}
          className="px-4 py-2 rounded-md uppercase bg-megent"
        >
          Login
        </Link>
      ) : (
        <div className="items-center gap-3 flex">
          <p className="text-white">{storedUserData?.username}</p>
          <button
            onClick={logOut}
            className="px-4 py-2 rounded-md uppercase bg-megent font-bold"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
    </>
  );
};

export default NavBar;
