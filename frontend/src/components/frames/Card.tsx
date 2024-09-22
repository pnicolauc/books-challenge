interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="rounded-lg shadow md:max-w-xl bg-gray-100 border-gray-700 bg-gray-800 p-4">
      <p className="text-xl mb-4">{title}</p>
      {children}
    </div>
  );
};
