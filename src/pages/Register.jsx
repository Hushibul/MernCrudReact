import TextInput from "../components/inputs/TextInput";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";

const Register = () => {
  const API_URL = "http://localhost:5000/api/users";
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

  useEffect(() => {
    const getdata = async () => {
      const db = await axios
        .get(API_URL)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    };
    getdata();
  }, []);

  const formSubmit = async (data) => {
    console.log(data.username);
    await axios
      .post(API_URL, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
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
              value: 5,
              message: "Password should be at least 5 character",
            },
          }),
        }}
        error={errors.password?.message}
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
