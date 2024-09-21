import Link from "next/link";

interface LinkCardProps {
  href: string;
  children: React.ReactNode;
}

export const LinkCard = ({ href, children }: LinkCardProps) => {
  return (
    <Link
      href={href}
      className="rounded-lg shadow md:max-w-xl bg-gray-100 border-gray-700 bg-gray-800 hover:bg-gray-700"
    >
      {children}
    </Link>
  );
};
