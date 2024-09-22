import NextLink from "next/link";

interface LinkProps {
  className?: string;
  disabled?: boolean;
  prefetch?: boolean;
  href: string;
  children: React.ReactNode;
}

export const Link = ({ className = "", disabled, href, prefetch, ...props}: LinkProps) => {
    return (
      <NextLink
        href={href}
        prefetch={prefetch}
        className={`text-white bg-gray-700 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center ${disabled ? 'bg-gray-900 text-gray-500 cursor-not-allowed' : 'hover:bg-gray-700 hover:bg-gray-800 focus:ring-blue-800'} ${className}`}
        {...props}
      />
    );
  };
  