import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const sortOrder = ["desc", "asc", "date-modified"];

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      sorting: "",
    },
  });

  const { storedToken } = useAuth();

  const formSubmit = (data) => {
    console.log(data);
  };

  //Getting All the users
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_GET_ALL_USER, {
        headers: {
          token: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //Updating User
  const updateUser = (someData) => {
    // axios.put(`${import.meta.env.VITE_GET_ALL_USER}/${}`);
    console.log(someData);
  };

  return (
    <>
      <form
        className="flex gap-4 items-center mt-4"
        onSubmit={handleSubmit(formSubmit)}
      >
        <Controller
          name="sorting"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <select
              {...field}
              className="mb-3 rounded block px-4 border-2 border-sky-600 focus:outline-sky-600 py-2"
            >
              {sortOrder.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          )}
        />
        <button
          type="submit"
          className="bg-sky-600 mb-3 uppercase font-semibold text-white px-4 py-2 rounded-md"
        >
          Filter
        </button>
      </form>

      <div className="w-fit mx-6">
        {userData.map((item, index) => (
          <div
            className="bg-slate-900 relative flex gap-4 px-4 py-2 items-center rounded-md mb-2"
            key={item._id}
          >
            <p className="p-2 bg-white rounded-full">{index + 1}</p>
            <h4 className="text-white w-40 truncate font-bold">
              {item.username}
            </h4>

            <div
              className={`bg-white gap-4 absolute bottom-0 p-4 rounded-sm right-8 ${
                editUser === index && item._id ? "flex" : "hidden"
              }`}
            >
              <button
                onClick={() => updateUser(item._id)}
                className="bg-green-500 px-4 uppercase font-semibold text-white py-2 rounded"
              >
                Admin
              </button>
              <button className="bg-red-500 px-4 uppercase font-semibold text-white py-2 rounded">
                User
              </button>
            </div>
            <button
              onClick={() => setEditUser(index)}
              className="bg-sky-600 uppercase font-semibold text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button className="bg-red-500 uppercase font-semibold text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
