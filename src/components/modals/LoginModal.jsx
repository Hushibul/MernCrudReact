import axios from "axios";
import decode from "jwt-decode";
import { useState } from "react";
import { XLg } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import TextInput from "../inputs/TextInput";

const Login = ({ openLoginModal, setOpenLoginModal }) => {
  const { storedToken, setStoredToken, setStoredUserData } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const formSubmit = async (data) => {
    const formdata = await axios
      .post(import.meta.env.VITE_LOGIN_API, {
        email: data?.email,
        password: data?.password,
      })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      });

    setStoredToken(formdata.token);
    setStoredUserData(formdata.user);

    const decodedToken = decode(storedToken);

    decodedToken.isAdmin === true
      ? navigate("/admin/dashboard")
      : navigate("/");

    resetField("email");
    resetField("password");

    setOpenLoginModal(false);
  };

  const handleGoogle = () => {
    window.location.assign("http://localhost:5000/auth/google");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white h-fit mt-20 mx-4 w-auto sm:w-[500px] sm:mx-auto sm:h-[500px] md:px-20 md:py-10 rounded-md shadow shadow-shadowSlate"
      >
        <div className="absolute cursor-pointer top-6 right-6">
          <XLg onClick={() => setOpenLoginModal(false)} size={25} />
        </div>
        <h2 className="text-3xl text-center text-gray font-bold uppercase">
          Log In
        </h2>
        <h4 className="text-center capitalize text-gray font-semibold py-2 text-sm">
          Join with our comunity
        </h4>

        <TextInput
          label="Email"
          id="email"
          placeholder="Enter your email"
          type="email"
          register={{
            ...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                message: "Email is not valid",
              },
            }),
          }}
          error={errors.email?.message}
        />
        <TextInput
          label="Password"
          id="password"
          placeholder="Enter your password"
          type="password"
          register={{
            ...register("password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 4,
                message: "Password should be at least 4 character",
              },
            }),
          }}
          error={error ? error : errors.password?.message}
        />

        <button
          onClick={handleGoogle}
          className="p-2 my-6 w-full rounded font-bold bg-danger text-white"
        >
          Sign Up With Google
        </button>

        <p className="text-gray font-bold mt-3">
          Don't have an accout yet?
          <Link
            className="ml-4 underline text-danger font-bold"
            to={"/register"}
          >
            Sign Up
          </Link>
        </p>
        <button
          className="px-4 py-2 rounded w-full bg-white border-2 border-gray font-bold text-gray my-6 hover:bg-gray hover:text-white transition-all duration-150"
          type="submit"
        >
          Submit
        </button>
      </form>

      {openLoginModal && (
        <div
          onClick={() => setOpenLoginModal(false)}
          className="w-full h-screen bg-gray opacity-50 absolute top-0 left-0 z-10"
        ></div>
      )}
    </>
  );
};

export default Login;
