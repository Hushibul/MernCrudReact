import axios from "axios";
import TextInput from "../components/inputs/TextInput";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Login = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const API_URL = "http://localhost:5000/api/login";

  const formSubmit = async (data) => {
    const formdata = await axios
      .post(API_URL, { email: data?.email, password: data?.password })
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });

    localStorage.setItem("user", JSON.stringify(formdata));
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="h-fit w-96 bg-cyan-400 mx-auto p-4 rounded-md shadow-md border border-sky-500"
    >
      <h2 className="text-3xl text-pink-500 text-center font-bold uppercase">
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
              value: 5,
              message: "Password should be at least 5 character",
            },
          }),
        }}
        error={error ? error : errors.password?.message}
      />

      <button
        className="px-4 py-2 rounded bg-pink-500 text-white my-6"
        type="submit"
      >
        Submit
      </button>
      <button
        className="px-4 py-2 ml-4 rounded bg-red-500 text-white my-6"
        onClick={() => localStorage.removeItem("db")}
      >
        Clear
      </button>
    </form>
  );
};

export default Login;
