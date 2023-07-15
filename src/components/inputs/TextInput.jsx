const TextInput = ({ label, id, type, placeholder, register, error }) => {
  return (
    <div>
      <label className="block py-2 text-gray font-bold" htmlFor={id}>
        {label}
      </label>
      <input
        className={`block w-full h-0 py-2 border-b-2 border-gray focus-within:outline-none focus-within:border-teal ${
          error && "border-danger"
        }`}
        type={type}
        id={id}
        // placeholder={placeholder}
        {...register}
      />

      <p className="text-danger font-bold">{error}</p>
    </div>
  );
};

export default TextInput;
