import { Search, XLg } from "react-bootstrap-icons";

const SearchModal = ({ openSearchModal, setOpenSearchModal }) => {
  return (
    <>
      <div className="absolute top-1/3 left-1/2 -translate-x-2/3 -translate-y-1/2 z-50  mt-20 mx-4 w-auto sm:w-[500px] flex items-center sm:mx-auto rounded-md shadow shadow-shadowSlate">
        <select
          className="w-fit p-[17px] h-auto focus-within:outline-none border-r border-gray"
          name="cateogory"
          id="category"
        >
          <option defaultChecked value="All Categories">
            All Categories
          </option>
          <option className="" value="Computers">
            Computers
          </option>
          <option className="" value="Laptops">
            Laptops
          </option>
          <option className="" value="Accessories">
            Accessories
          </option>
        </select>
        <input
          className="p-4 w-3/4 focus-within:outline-none"
          type="search"
          placeholder="Search..."
        />
        <div className="bg-danger h-full p-4 rounded">
          <Search size={25} color="white" />
        </div>
      </div>
      {openSearchModal && (
        <div className="w-full h-screen bg-gray opacity-50 absolute top-0 left-0 z-10">
          <button
            onClick={() => setOpenSearchModal(false)}
            className="absolute top-16 right-16"
          >
            <XLg size={30} color="white" />
          </button>
        </div>
      )}
    </>
  );
};

export default SearchModal;
