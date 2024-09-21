interface InputGroupProps {
  children: React.ReactNode;
}

export const InputGroup = ({ children }: InputGroupProps) => {
  return (
    <div className="flex flex-col mb-4">
      {children}
    </div>
  );
}