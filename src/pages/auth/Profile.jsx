import axios from "axios";
import decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileInput from "../../components/inputs/FileInput";
import TextInput from "../../components/inputs/TextInput";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { storedToken } = useAuth();
  const decodedToken = decode(storedToken);
  console.log(decodedToken._id);

  const [userData, setUserData] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      avatar: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    const response = async () => {
      const data = await axios.get(
        `${import.meta.env.VITE_GET_ALL_USER}/${decodedToken._id}`
      );
      setUserData(data);
    };
    response();
  }, []);

  const formSubmit = async (data) => {
    const formdata = await axios
      .put(
        `${import.meta.env.VITE_EDIT_PROFILE}/${decodedToken._id}`,
        {
          username: data?.username,
          email: data?.email,
          avatar: data?.avatar,
        },
        {
          headers: {
            token: `Bearer ${storedToken}`,
            "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
        console.log(err);
      });
  };

  return (
    <div className="p-10">
      <form
        action="http://localhost:5000/api/auth/profile"
        onSubmit={handleSubmit(formSubmit)}
        encType="multipart/form-data"
        method="post"
      >
        <TextInput
          label="Username"
          id={"username"}
          type={"text"}
          placeholder={userData?.data?.username}
          register={{
            ...register("username", {
              required: { value: true, message: "Username is required" },
            }),
          }}
          error={errors.username?.message}
        />
        <TextInput
          label="Email"
          id={"email"}
          type={"email"}
          placeholder={userData?.data?.email}
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

        <FileInput
          id="avatar"
          label={"Choose Your Profile Avatar"}
          register={{
            ...register("avatar"),
          }}
        />

        <button
          onClick={formSubmit}
          className="px-4 py-2 bg-megent rounded shadow-orange-300 mt-6 text-white font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Profile;
