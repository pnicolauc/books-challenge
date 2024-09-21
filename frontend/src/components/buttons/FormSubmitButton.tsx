import { useFormStatus } from "react-dom";
import { Button } from "./Button";
import { ReactNode } from "react";

export const FormSubmitButton = ({ children }: { children: ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex items-end justify-content-end items-center">
      <Button disabled={pending} type="submit">
        {children}
      </Button>
      {pending && <div className="ml-2">Submitting...</div>}
    </div>
  );
};
