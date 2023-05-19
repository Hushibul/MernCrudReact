const TextInput = ({ label, id, type, placeholder, register, error }) => {
  return (
    <div>
      <label className="block py-2 text-sky-600 font-bold" htmlFor={id}>
        {label}
      </label>
      <input
        className={`block w-full px-4 py-2 rounded border border-sky-500 placeholder:text-gray-400 ${
          error && "outline-pink-600"
        }`}
        type={type}
        id={id}
        placeholder={placeholder}
        {...register}
      />

      <p className="text-red-500">{error}</p>
    </div>
  );
};

export default TextInput;
