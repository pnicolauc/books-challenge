export const Button = ({ className = "", ...props}) => {
  return (
    <button
      className={`disabled:bg-gray-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 ${className}`}
      {...props}
    />
  );
};
