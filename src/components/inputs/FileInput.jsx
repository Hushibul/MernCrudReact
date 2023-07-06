
const FileInput = ({register, id, label}) => {
  return (
    <div className="mt-4">
        <label className="relative font-bold text-lg w-20 mt-4 px-4 py-2 border-2 rounded-md border-teal" htmlFor={id}>{label}
        <input {...register} className="opacity-0 absolute left-0 top-0" name={id} type="file"  /> </label>
    </div>
  )
}

export default FileInput