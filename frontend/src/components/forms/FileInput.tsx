interface InputProps {
  id: string;
  name: string;
}

export const FileInput = (props: InputProps) => {
  return (
    <input
      type="file"
      className="file:w-0 file:hidden border text-sm rounded-xl block w-full p-2.5 bg-gray-700 file:bg-gray-700 file:border-0 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
      {...props}
    />
  );
};
