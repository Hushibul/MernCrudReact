import { useState } from "react";
import {
  ArrowDown,
  Cart,
  List,
  Mailbox,
  Person,
  Phone,
  Search,
  XLg,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import { menu } from "../../assets/constants/constants";
import AvatarConstantImage from "../../assets/images/avatar_image.png";
import useAuth from "../../hooks/useAuth";
import Login from "../modals/Login";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { storedUserData, logOut } = useAuth();

  console.log(storedUserData?.avatar);

  const avatarUrl = `${import.meta.env.VITE_API_URL}/${storedUserData?.avatar}`;
  console.log(avatarUrl);

  return (
    <>
      {/* TOPNAV  */}
      <div className="bg-white flex flex-col gap-x-3 p-4 shadow-sm shadow-wheat md:flex-row">
        <div className="flex justify-center items-center gap-x-3">
          <Phone />
          <a href="tel:+88 0173892893892" className="text-danger font-semibold">
            +88 0173892893892
          </a>
        </div>

        <div className="flex justify-center items-center gap-x-3">
          <Mailbox />
          <a
            className="text-danger font-semibold"
            href="mailto:gallaxytech@gmail.com"
          >
            gallaxytech@gmail.com
          </a>
        </div>

        <div className="ml-auto hidden cursor-pointer md:block relative group">
          <span className="font-bold flex items-center">
            En <ArrowDown />
          </span>
          <ul className="absolute top-6 left-2 hidden p-3 bg-white rounded-sm group-hover:block shadow shadow-wheat">
            <li className="hover:text-danger font-bold">EN</li>
            <li className="hover:text-danger font-bold">UN</li>
          </ul>
        </div>
        <div className="hidden md:block mr-8 cursor-pointer relative group">
          <span className="font-bold flex items-center">
            USD <ArrowDown />
          </span>
          <ul className="absolute top-6 left-2 hidden p-3 bg-white rounded-sm group-hover:block shadow shadow-wheat">
            <li className="hover:text-danger font-bold">USD</li>
            <li className="hover:text-danger font-bold">EUR</li>
          </ul>
        </div>
      </div>

      {/* NAVBAR  */}
      <nav
        className={`flex p-4 items-center relative shadow-sm shadow-shadowSlate ${
          openMenu && "flex-col items-stretch"
        }`}
      >
        <div className="flex flex-col basis-1/2 md:basis-1 gap-y-1 text-sm font-bold flex-wrap">
          <Link
            to={"/"}
            className="font-black text-danger underline text-3xl  md:text-4xl"
          >
            GallaxyTech
          </Link>
          <span className="">Mall Center of Technology & Best Price</span>
        </div>

        <ul
          className={`md:flex gap-x-4 md:flex-row md:ml-20 ${
            openMenu ? "flex gap-x-4 items-center flex-col" : "hidden"
          }`}
        >
          {menu.map((item) => (
            <li className="font-bold text-lg text-gray" key={item.id}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

        <ul className="flex items-center justify-center ml-auto gap-x-1 mr-2 md:mr-8 md:gap-x-4">
          <li className="cursor-pointer">
            <Search size={20} />
          </li>
          <li className="cursor-pointer relative">
            {storedUserData !== null && storedUserData?.avatar ? (
              <img
                className="w-10 h-10 rounded-full overflow-hidden"
                onClick={() => setProfileMenu(true)}
                src={avatarUrl}
                alt={storedUserData?.name}
              />
            ) : storedUserData !== null ? (
              <img
                className="w-10 h-10 rounded-full overflow-hidden"
                src={AvatarConstantImage}
                alt="Avatar Image"
              />
            ) : (
              <Person onClick={() => setOpenLoginModal(true)} size={20} />
            )}

            <div
              className={`absolute top-10 left-0 w-24 h-24 justify-center bg-white z-10 p-2 rounded shadow shadow-shadowSlate flex-col items-start ${
                profileMenu ? "flex" : "hidden"
              }`}
            >
              <Link className="hover:text-danger" to={"/auth/profile"}>
                Edit Profile
              </Link>
              <button onClick={() => logOut()} className="hover:text-danger">
                Log Out
              </button>
            </div>
          </li>
          <li className="cursor-pointer">
            <Link to={"/cart"}>
              <Cart size={20} />
            </Link>
          </li>
          <li
            className="cursor-pointer absolute top-11 right-0 md:hidden"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {!openMenu ? <List size={24} /> : <XLg size={24} />}
          </li>
        </ul>
      </nav>

      {openLoginModal && (
        <Login
          openLoginModal={openLoginModal}
          setOpenLoginModal={setOpenLoginModal}
        />
      )}
    </>
  );
};

export default NavBar;
