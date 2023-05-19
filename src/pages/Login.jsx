import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

import TextInput from "../components/inputs/TextInput";
import decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
    console.log(data);
    const formdata = await axios
      .post(import.meta.env.VITE_LOGIN_API, {
        email: data?.email,
        password: data?.password,
      })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        console.log(err);
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
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="h-fit mt-20 mx-4 w-auto sm:w-96 sm:mx-auto p-2 md:px-6 md:py-4 bg-slate-100 rounded-md shadow-md border border-sky-500"
    >
      <div>
        <h2 className="text-3xl text-sky-600 text-center font-bold uppercase">
          Login
        </h2>

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

        <p className="text-gray-600 mt-3">
          Don't have an accout yet?
          <Link
            className="ml-4 underline text-sky-800 font-bold"
            to={"/register"}
          >
            Sign Up
          </Link>
        </p>
        <button
          className="px-4 py-2 rounded bg-sky-600 text-white my-6"
          type="submit"
        >
          Submit
        </button>
        <button
          className="px-4 py-2 ml-4 rounded bg-red-500 text-white my-6"
          onClick={() => localStorage.removeItem("token")}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default Login;
