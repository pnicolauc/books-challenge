interface InputProps {
    type: string;
    id: string;
    name: string;
    placeholder?: string;
    defaultValue?: string;
}

export const Input = (props: InputProps) => {
    return (
        <input
            className="border text-sm rounded-xl block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            {...props}
        />
    );
    }