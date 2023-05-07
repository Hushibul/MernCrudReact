import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

import TextInput from "../components/inputs/TextInput";

const Register = () => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const formSubmit = async (data) => {
    const formData = await axios
      .post(import.meta.env.VITE_REGISTER_API, {
        username: data?.username,
        email: data?.email,
        password: data?.password,
      })
      .then((res) => res?.data)
      .catch((err) => {
        console.log(err);
        setError(err?.response?.data?.message);
      });

    localStorage.setItem("token", formData?.token);
  };
  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="h-fit w-96 bg-cyan-400 mx-auto p-4 rounded-md shadow-md border border-sky-500"
    >
      <h2 className="text-3xl text-pink-500 text-center font-bold uppercase">
        Register
      </h2>
      <TextInput
        label="Username"
        id="username"
        placeholder="Enter your username"
        type="text"
        register={{
          ...register("username", {
            required: { value: true, message: "Username is required" },
          }),
        }}
        error={errors.username?.message}
      />
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
        className="px-4 py-2 font-bold rounded bg-pink-500 text-white my-6"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Register;
