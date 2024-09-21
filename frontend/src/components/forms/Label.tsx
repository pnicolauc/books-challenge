interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const Label = (props: LabelProps) => {
  return <label className="font-bold text-gray-200" {...props} />;
};
