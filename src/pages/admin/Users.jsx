import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const sortOrder = ["desc", "asc", "date-modified"];

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { storedToken } = useAuth();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      sorting: "",
    },
  });

  const formSubmit = async (data) => {
    await axios
      .get(import.meta.env.VITE_GET_ALL_USER, {
        params: {
          sortOrder: data.sorting,
        },
        headers: {
          token: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.users);
      })
      .catch((err) => console.log(err));

    // window.location.reload();
  };

  //Getting All the users
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_GET_ALL_USER, {
        params: {
          page: currentPage,
          limit: 5,
        },
        headers: {
          token: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.users);
        setCurrentPage(parseInt(res.data.currentPage));
        setTotalPage(res.data.totalPage);
      })
      .catch((err) => console.log(err));
  }, []);

  //Updating User
  const updateUser = async (objectId) => {
    await axios
      .put(
        `${import.meta.env.VITE_GET_ALL_USER}/${objectId}`,
        { isAdmin: isAdmin },
        {
          headers: {
            token: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        console.log(err);
      });

    window.location.reload();
  };

  const promoteToAdmin = () => {
    setIsAdmin(true);
    setEditUser(false);
  };

  const demoteToUser = () => {
    setIsAdmin(false);
    setEditUser(false);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  //Deleting User
  const deleteUser = async (objectId) => {
    await axios
      .delete(`${import.meta.env.VITE_GET_ALL_USER}/${objectId}`, {
        headers: {
          token: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        console.log(err);
      });

    window.location.reload();
  };

  console.log(totalPage, currentPage);

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
              className="mb-3 cursor-pointer rounded block px-4 border-2 border-sky-600 focus:outline-sky-600 py-2"
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

            <h4 className="text-white w-40 truncate font-bold">
              {item.isAdmin ? "Admin" : "User"}
            </h4>

            <div
              className={`bg-white gap-1 absolute bottom-0 p-1 rounded-sm right-32 ${
                editUser === index && item._id ? "flex" : "hidden"
              }`}
            >
              <button
                onClick={promoteToAdmin}
                className="bg-green-500 px-2 uppercase font-semibold text-xs text-white py-1 rounded-sm"
              >
                Admin
              </button>
              <button
                onClick={demoteToUser}
                className="bg-red-500 px-2 uppercase text-xs font-semibold text-white py-1 rounded-sm"
              >
                User
              </button>
            </div>

            <button
              onClick={() => setEditUser(index)}
              className="bg-sky-600 uppercase font-semibold text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteUser(item._id)}
              className="bg-red-500 uppercase font-semibold text-white px-4 py-2 rounded"
            >
              Delete
            </button>
            <button
              disabled={editUser === null ? true : false}
              onClick={() => updateUser(item._id)}
              className="bg-green-500 uppercase font-semibold text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        ))}

        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            className="px-4 py-2 rounded bg-sky-600 text-white"
          >
            Prev
          </button>

          {/* {totalPage.map((item) => (
            <p key={item}>{item}</p>
          ))} */}
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded bg-sky-600 text-white"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Users;
