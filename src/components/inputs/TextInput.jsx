const TextInput = ({ label, id, type, placeholder, register, error }) => {
  return (
    <div>
      <label className="block py-2 text-white font-bold" htmlFor={id}>
        {label}
      </label>
      <input
        className={`block w-full px-4 py-2 rounded text-white placeholder:text-wheat bg-darkNavy focus-within:outline-none ${
          error && "focus-within:outline-danger border-none"
        }`}
        type={type}
        id={id}
        placeholder={placeholder}
        {...register}
      />

      <p className="text-danger font-bold">{error}</p>
    </div>
  );
};

export default TextInput;
